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

Really, there isn't anything blazingly cutting edge and original about this blog - is anything [really original][orig] anyway?

What is unique about this blog is that its mine and I set it up in a way that makes sense to me, and possibly you too if you read on.

## Domain & Network

Both my domain and web application firewall (WAF) are provided by CloudFlare.

I've always liked CloudFlare.

They offer a lot of really good (free) options for DNS, caching, etc. The user experience, reliable DNS updates, and fast network provides an easy choice.

## Static Site Host

I've been doing a lot of work in GCP recently, so I decided to host this project in a Google Cloud Storage (GCS) bucket.

The configuration is straightforward and simple, and they have very nice integration with Terraform which is a key selling point for me.

All of those configurations can be found in my [terraform-gcp-infra][tgi] repo in GitHub.

## Static Site Generator

[Hugo][hugo] has been great as a technology for generating static sites. There are plenty of themes available and templates online which allo you to really just focus on writing content.

It's written in Golang, so it's a single binary and is incredibly fast. Hugo also offers very easy multi-environment support through the use of the `-e` switch during build + a `config/` directory layout like so:

### Hugo Environment Configs

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

Note: Hugo will accept yaml, toml, or json - though I chose yaml.

We can see a `_default/` directory, which is [the convention][hugoDir] documented within Hugo, where all of our default configurations will reside.

We are able to _override_ any default configurations set within that directory in environment specific directories.

You'll notice a [params.yaml][hugoOmit] that contains all environment specific parameters, with an omitted 'params' root key.

I don't have a ton of configuration, but being able to test or develop without possibly affecting "production" is a huge blessing.

## CI

GitHub Actions is the Continuous Integration (CI) that I use to rapidly develop, build, and deploy the blog. In recent years, its become widely used and is a free offering from GitHub - plus I use it at work and am familiar with it - so another easy choice.

### GitHub Repo

Before talking more about GitHub Actions, I need to discuss how I've structured my repo. I have the following branches that I use for development:

- develop
- staging
- main

I "map" these branches to [configurations](#hugo-environment-configs) I use to differentiate stages or deployments of my home page.

This allows me to fully test the integration of what I'm working on behind CloudFlare while being served as static content by GCS. This can make **a lot** of difference as sometimes localhost doesn't always cut it.

### Build and Deploy

I've created a GitHub Actions workflow file named [ci.yml][ci.yml]

### Create PR

TODO Discuss Create PR workflow

## Conclusion

TODO

[orig]: https://www.goodreads.com/quotes/131591-nothing-is-original-steal-from-anywhere-that-resonates-with-inspiration
[tgi]: https://github.com/colinbruner/terarform-gcp-infra
[hugo]: https://gohugo.io/
[hugoDir]: https://gohugo.io/getting-started/configuration/#configuration-directory
[hugoOmit]: https://gohugo.io/getting-started/configuration/#omit-the-root-key
[gha]: https://github.com/features/actions
[ci.yml]: https://github.com/colinbruner/colinbruner.com/blob/main/.github/workflows/ci.yml
