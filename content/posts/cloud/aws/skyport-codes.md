---
author: ["Colin Bruner"]
title: "Skyport.codes, a simple IATA API"
date: 2021-11-09
tags: ["aws", "cloud", "serverless", "travel"]
showtoc: true
tocopen: true
---

## Background

When I was working with Verisign, we would typically name our remote edge sites based on the closest airport code in the area. The edge sites might look something like this:

```
# {Airport Code}[Iterative Number]
ORD2 - Chicago
DFW6 - Dallas
MAD1 - Madrid
LCY7 - London
```

Each code would represent a new site that was deployed around that geographical location. The ending number would increase by 1 to keep edge sites unique. We never got to double digits, thankfully, as people were always worried a lot of code that made strong assumptions (like edge sites always end in a digit from 1 to 9) would break.

### Skyports

Working with hundreds of these sites daily, I began to memorize the geographical locations of these 3 letter codes.

However, there were some that would always elude me (looking at you SVO). To kill some time and solve this little problem, I bought the domain `skyport.codes`.

Why `skyport.codes`? Well, mostly beause it was super cheap - I think I spent like $3 for the year. Additionally, any domain with 'airport' or 'iata', the official name for those 3 letter codes, was very expensive.

## Building the API

Working primarily with AWS professionally at the time, I decided to deploy there. I determined I'd use the following services:

- API Gateway (API Access)
- Lambda (Compute)
- dynamoDB (Database)

The goal was to forward HTTPS requests to `skyport.codes/iata/<code>` through API Gateway. The requests would be routed to the Lambda, which would interact with dynamoDB to grab information about the specific airport code requested.

It would look something like this:

```bash
# Returns JSON with information about the IATA code
$ curl -sS https://skyport.codes/iata/iad | jq
{
  "IATA": "IAD",
  "ICAO": "KIAD",
  "Airport Name": "Washington Dulles International Airport",
  "Location Served": "Washington, D.C.,1 United States",
  "Time (UTC)": "UTC−05:00",
  "DST": "Mar-Nov"
}
```

### Building the Infrastructure

As mentioned above, I really only had 3 components for this API.

- Public Connectivity (DNS -> API Gateway)
- The Application (Lambda)
- The Database (dynamoDB)

I decided to create all of the infrastructure using [Terraform][tf]. I was most familiar with this tool and it's useful in so many ways from Cloud configuration to configuring any API that has a Terraform provider.

The Terraform code for creating dynamoDB is [here][db] and the api gateway + lambda is [here][api]. As a bonus, I managed to stay completely within the free tier for all of these services!

### Building the Data

Now that the infrastructure was in place, I still needed to fill the database.

As I began to look for the data available, I noticed other online services that published data about airport IATA codes were all behind a paywall or subscription - which was something I definitely did not want to deal with.

Thankfully, this is all public information available on Wikipedia. All I had to do was build a [web scraper][ws] to pull the data and generate JSON.

I found that Wikipedia organizes this data into tables based on the letters that the airport codes start with.

Starting with [letter A][code_a], I worked my way through the alphabet and pulled down information on each letter. Finally, I built this into a JSON object and wrote it to a file.

Here's [the code][generate] I used to generate it.

### Uploading the Data

Now that I had the data, I just needed to upload it to dynamoDB.

This was done by using the local JSON file from the [Building the Data](#building-the-data) step above and pushing it up to dynamoDB.

Here's [the code][upload] to upload it.

### Looking Back

The last two steps were prime candidates for an automated Continuous Integration (CI) process that could be scheduled at certain times or triggered based on specific events.

Ultimately, I decided to just run the code locally as it was the easiest and the API was really just a weekend project for me.

## Go Live

That's it! I didn't make any announcement or have any official go-live, but I put it all together and it worked - that was at least satisfying for me.

[code_a]: https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_A
[generate]: https://github.com/colinbruner/skyport.codes/tree/main/data/generate
[upload]: https://github.com/colinbruner/skyport.codes/tree/main/data/upload
[db]: https://github.com/colinbruner/skyport.codes/tree/main/infra/db
[api]: https://github.com/colinbruner/skyport.codes/tree/main/infra/api
[tf]: https://www.terraform.io/
[ws]: https://en.wikipedia.org/wiki/Web_scraping
