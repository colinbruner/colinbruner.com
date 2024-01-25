---
author: ["Colin Bruner"]
title: "Automating Lazy Vendors"
date: 2023-04-29
tags: ["gcp", "cloud", "serverless", "pub/sub"]
showtoc: true
tocopen: true
---

I'm going to briefly talk about the process I undertook in migrating an "on prem" video communication vendor from AWS to GCP. In addition, I automated the painful manual parts of scaling the service using event triggers, pubsub, and serverless technologies.

## The Application

The application hosts video communication software that connects customers and employees, like Zoom but worse.

The software is delivered as a [tar][tar] file which they provide as input to build an Elastic Compute (EC2) or Google Compute Engine (GCE) image (read: a Virtual Machine (VM) image).

The app is comprised of the following components:

- Proxy nodes: Must be publicly routable, they forward connections to Transcoder nodes
- Transcoder nodes: Heavy compute nodes - they handle the video calls
- Manager node: A single node that handles scheduling calls and administrative tasks

All of these are VM "appliances" packaged as tar files by the software provider.

### Enrollment

Once the Manager node is bootstrapped, a tedious process that I won’t dive into here, Proxy and Transcoder nodes can be provisioned.

The manual provisioning steps look something like this:

1. Within the Manager GUI, fill out the configuration form for the node to be provisioned
   - This contains attributes such as, `hostname`, `ip-address`, `node-type`, etc
2. The form generates an XML file containing the configuration of the node being provisioned
3. The XML file must then to be sent over the network via an HTTP POST to the new node, on port `8443`

When I originally joined this company, the process was completely manual. You can imagine how long it’d take to provision 10+ nodes in a scale-up or scale-down event!

The rest of this post will talk about the steps I took to automate this process using Terraform and an event-driven architecture design.

## Infrastructure

The core components in both AWS and GCP are the same. The technology simply uses Cloud Compute resources (EC2 vs GCE) to run images launched on a network with internal connectivity (typically within a VPC) and routable externally via statically assigned IP addresses (only required on Proxy nodes).

### Old - AWS

The original AWS infrastructure was set up manually and rather quickly without a lot of understanding about how the application works.

Because of the requirements of the application and due to how AWS EC2 handles NUMA vCPUs, the AWS EC2 instances actually had to be deployed onto dedicated hosts to avoid any potential issues with other VM guests on the shared physical server resources.

### New - GCP

I created the GCP infrastructure fully in Terraform. It is primarily comprised of Managed Instance Groups (MIGs) running Google Compute Engine (GCE) Instances.

Very simple. The more exciting piece was the use of Google Cloud Platform's EventArc service to automatically react to published events (think a GCE instance start events) and react to them using Serverless hooks.

## Automation

Recall the manual setup process discussed in the [Enrollment](#enrollment) section. After the Proxy or Conference node is brought online, they need to be "enrolled" with the Manager.

This allows the Manager to generate the XML file and provide it back to the Proxy or Conference node so that it knows its own configurations and ultimately what to connect to.

### Driving Action with Events

Thankfully with the use of standard audit events published to GCP Cloud Logging, we were able to "catch" and react when certain things within GCP happened.

From a high level, the process looks like this:

```mermaid
sequenceDiagram
   participant mig as Instance Group
   participant gce as GCE Instance
   participant sink as Log Sink
   participant pubsub as Pub/Sub
   participant cf as Cloud Function
   participant mgr as Manager
   participant api as GCP Compute API

   Note over mig,api: This is a simplified version of interactions
   mig->>+gce: Starts a GCE Instance
   gce->>+sink: Instance Started Audit Event Fires
   sink->>+pubsub: Publishes Captured Event
   cf->>+pubsub: Subscribes to Events Published
   pubsub--)cf: Triggers Code to be Executed
   cf->>+api: API Call for Network Information about GCE Instance
   api--)cf: Returns Network Information
   cf->>+mgr: Creates Configuration for GCE Instance
   mgr->>+cf: Returns XML Configuration
   cf->>+gce: Registers Node with XML via HTTP POST
```

### More Detail

The below is half for my own record to easily remember. For those curious about the details, please read on.

1. GCE Instance added to GCE MIG
   - Triggers the `compute.instances.insert` Audit Event
1. GCP [Log Router Sink][sink] captures the `compute.instances.insert` event message
   - Publishes these events to a Pub/Sub topic as JSON with useful details like ID of GCE Instance, project ID, etc
1. The Pub/Sub topic is subscribed to by a Cloud Function
1. The Cloud Function interacts with GCP’s APIs to query information about the ID of the GCE Instance retrieved from Pub/Sub message
   - Retrieve information such as IP, Gateway, Hostname, Metadata, etc
   - Metadata is used to determine what type of node this is: Transcoder or Proxy
1. The Cloud Function sends the data via HTTP POST to the Manager
   - This creates the initial configuration entry with the Manager
   - This returns XML binary data
1. The Cloud Function sends an HTTP POST request to the GCE Instance that was just added on port 8443
   - The code making the request is configured to retry with incremental backoffs for up to 10 minutes
   - This is due to the whole process thus far described happening very quickly; the GCE Instance may not have opened port 8443 quick enough to receive the initial POST sent by Cloud Function
1. The GCE Instance (eventually) returns success
   - The node appears within the Manager’s GUI and begins to fully synchronize its configurations

#### Example Log Router Query

My goal is to make the explanation of this as straight forward as possible. To further that purpose, the Log Router Sink query (mentioned above) might look something like this:

```
log_name="projects/my-project-755/logs/cloudaudit.googleapis.com%2Factivity"
operation.first="true"
protoPayload.methodName="v1.compute.instances.insert"
protoPayload.resourceName=~"projects/my-project-123/zones/us-east1-[a-z]/instances/vendor-(proxy|transcoder)-.*"
```

In the field piece of the query, `protoPayload.resourceName`, I'm filtering out GCE Instances using regex on the name of the GCE Instance being created.

## In Conclusion

This is one part of a two part process. The opposite of registration (this) is the "deregistration" of those GCE Instances with the Manager whenever a GCE Instance is terminated... however, I won't cover that here.

Stringing together all of these inputs and outputs was really interesting! As my first foray into working with GCP services, it was overall painless.

[tar]: https://en.wikipedia.org/wiki/Tar_(computing)
[sink]: https://cloud.google.com/logging/docs/routing/overview#sinks
