---
author: ["Colin Bruner"]
title: "The Blogs Architecture"
date: 2024-01-29
tags: ["gcp", "cloudflare", "github-actions", "cms"]
draft: true
categories: ["software", "cloud"]
showtoc: true
tocopen: true
---

The following post is talking about this website from a technical point-of-view. The website is a static site deployed to GCP behind Cloud Flare, creative - I know.

Really, there isn't anything blazingly cutting edge and original about this blog - is anything [really original][orig] anyway? What is unique about this blog is that its mine and setup in a way that makes sense to me, and possibly you too if you read on.

I'll elaborate a bit on the setup and technologies used below:

## Domain & Network

Both my domain and web application firewall (WAF) are provided by CloudFlare. I've always liked CloudFlare. They offer a lot of really good (free) options for DNS, caching, etc. The user experience, reliable DNS updates, and fast network provides an easy choice.

## Static Site Host

I've been doing a lot of work in GCP recently, so I decided to host this project in a Google Cloud Storage (GCS) bucket there. The configuration is generally pretty simple, and they have very nice integration with Terraform which is a key selling point for me.

All of those configurations can be found in my [terraform-gcp-infra][tgi] repo in GitHub.

## Static Site Generator

[Hugo][hugo] has been great as a technology for generating static sites. There are plenty of themes available and templates online which allo you to really just focus on writing content.

It's written in Golang, so it's a single binary and is incredibly fast. Hugo also offers very easy multi-environment support through the use of the `-e` switch during build + a `config/` directory layout like so:

```tree
├── staging
│   ├── params.yaml
│   └── config.yaml
├── develop
│   ├── params.yaml
│   └── config.yaml
├── _default
│   └── config.yaml
└── production
    ├── params.yaml
    └── config.yaml
```

[orig]: https://www.goodreads.com/quotes/131591-nothing-is-original-steal-from-anywhere-that-resonates-with-inspiration
[tgi]: https://github.com/colinbruner/terarform-gcp-infra
[hugo]: https://gohugo.io/

## Outline

- Hugo easily builds static websites
- GitHub Action builds and releases to Google Cloud Storage
- Google Cloud Storage serves static files
- Cloudflare routes and caches website assets

Talk about multi-enviornment using Hugo -config and cloudflare subdomains
