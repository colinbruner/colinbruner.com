---
author: ["Colin Bruner"]
title: "Skyport.codes, a very simple API"
date: 2021-11-09
tags: ["aws", "cloud", "serverless", "travel"]
#categories: []
showtoc: true
tocopen: true
---

## Background

When I was working with Verisign, we would (typically) name our remote edge sites based on the closest airport code in the area. So the schema would look something like this,

```
# {Airport Code}[Iterative Number]
ORD2 - Chicago
DFW6 - Dallas
MAD1 - Madrid
LCY7 - London
```

With each new site at or around that location taking the next number in the list. We never got to double digits, thankfully, as worried a lot of code making assumptions on these unique site codes would break.

### Skyports

Anyway, into the purpose of this post! Working with many dozens of these sites daily, I began to memorize the geographical locations of these 3 letter codes.

However, there were some that would always elude me (looking at you SVO). So as one of my first forays into working with AWS I bought the domain `skyport.codes`.

Mostly this was beause it was super cheap, I think I spent like $3 for the year, but also any domain with airport or IATA (official name those 3 letter codes) in the name was very expensive.

## Building the API

Working with AWS at the time, and being very cheap as this was just a silly personal project, I'd decided I'd use the following components:

- dynamoDB
- Lambda
- API Gateway

The goal was to forward requests to `skyport.codes` to API Gateway. This would route those requests to the Lambda, which would interact with dynamoDB to grab information about the specific airport code requested.

The goal was something like this:

```bash
# Returns JSON with information about the IATA code
$ curl -sS https://skyport.codes/iad | jq
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

As mentioned above I really only had 3 components for this tiny API.

- Public Connectivity (DNS + API Gateway)
- The Application (Lambda)
- The Database (dynamoDB)

There isn't too much to talk about here, I decided to stand everything up using Terraform. I was most familiar with this tool and it's useful in so many ways from Cloud configuration to configuring any API that has a Terraform provider.

The code for the db is [here][db] and the api gateway + lambda is [here][api]. The awesome thing about this is I managed to stay completely within the free tier for all of these services!

### Building the Data

So the infrastructure was in place, but I still needed to fill the database. As I began to look for the data available I noticed other online services that published data about airports IATA codes were all behind a paywall - something I definitely did not want to deal with.

Thankfully, this is all public information available on Wikipedia. All I had to do was build a scrapper to pull it and generate JSON.

I found that Wikipedia organizes this data into tables based on the letters that the airport codes start with.

Starting with [letter A][code_a], I iterated through the alphabet and pulled down information on each letter. Finally I built this into a JSON object and wrote it to disk.

Here's [the code][generate] to generate it.

### Uploading the Data

Now that I had the data, I just needed to upload it to dynamoDB. Very simply this was done by reading in the local JSON file from the [Building the Data](#building-the-data) step above and pushed it up to dynamoDB.

Here's [the code][upload] to upload it.

### Looking Back

The last two steps were prime candidates for an automated CI process that could be scheduled at certain times or triggered based on specific events. Ultimately, I ran the code mentioned locally as it was easiest and the API was really just a weekend experiment for me.

## Go Live

That's it! I didn't make any announcement or have any official go-live, but I put it all together and it worked - that was at least satisfying for me.

[code_a]: https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_A
[generate]: https://github.com/colinbruner/skyport.codes/tree/main/data/generate
[upload]: https://github.com/colinbruner/skyport.codes/tree/main/data/upload
[db]: https://github.com/colinbruner/skyport.codes/tree/main/infra/db
[api]: https://github.com/colinbruner/skyport.codes/tree/main/infra/api
