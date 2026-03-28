---
title: "This Blog's Architecture"
date: "2024-01-29"
tags: ["sveltekit", "gcp", "cloudflare", "github-actions"]
draft: true
description: "A technical overview of this blog's architecture — SvelteKit for SSG, GCS for hosting, Cloudflare for CDN/WAF, and GitHub Actions for CI/CD."
---

The following post is a technical overview of this website. It's a statically generated site deployed to GCP behind Cloudflare — not exactly bleeding edge, but set up in a way that makes sense to me.

Really, there isn't anything blazingly original about this blog. Is anything [really original][orig] anyway?

What's unique is that I set it up in a way that I understand and can reason about completely — from the code to the CDN.

## Domain & Network

Both my domain and web application firewall (WAF) are provided by Cloudflare.

I've always liked Cloudflare. They offer a lot of genuinely good free options for DNS, caching, and security. The user experience, reliable DNS updates, and fast network make it an easy choice.

## Static Site Host

I've been doing a lot of work in GCP, so I decided to host this project in a Google Cloud Storage (GCS) bucket.

The configuration is straightforward, and the Terraform integration is excellent. All infrastructure configuration lives in my [terraform-gcp-infra][tgi] repo.

## Static Site Generator

[SvelteKit][sveltekit] with `adapter-static` handles the static site generation. Unlike a traditional SSG, SvelteKit gives you a full framework with routing, data loading, and component composition — which produces a clean, fast static site output.

A few things I appreciate about this stack:

- **TypeScript-friendly** — Full type support out of the box
- **[mdsvex][mdsvex]** — Markdown processing with Svelte component support; powers this blog's posts
- **[Shiki][shiki]** — Beautiful, accurate syntax highlighting via VS Code's tokenizer
- **Tailwind CSS** — Utility-first styling that stays out of the way

### Content Pipeline

Blog posts are Markdown files processed by mdsvex. They're imported at build time using Vite's `import.meta.glob`, which gives me metadata (frontmatter) for the listing pages and the full rendered component for individual post pages.

```javascript
// Load all posts at build time
const postModules = import.meta.glob('/src/content/posts/*.md', { eager: true });
```

Frontmatter like `title`, `date`, `tags`, and `description` drives the post listings, reading time calculations, and tag pages — all generated at build time.

## CI/CD

GitHub Actions handles build and deploy. The workflow:

1. Checkout code
2. Setup Node.js
3. Install dependencies (`npm ci`)
4. Build SvelteKit site (`npm run build`)
5. Authenticate to GCP via OIDC (no long-lived credentials)
6. Sync `build/` to the target GCS bucket

### Branch → Environment Mapping

```
develop  → develop.colinbruner.com  (gs://develop.colinbruner.com)
main     → colinbruner.com          (gs://colinbruner.com)
```

A separate workflow handles automatic PR creation to promote changes from `develop → main`.

## Cost

- Cloudflare: Free
- GitHub / GitHub Actions: Free
- Google Cloud Storage: Cents per month

With Cloudflare caching in front of GCS, the actual GCS traffic (and cost) is minimal. Total infrastructure cost is negligible.

[orig]: https://www.goodreads.com/quotes/131591-nothing-is-original-steal-from-anywhere-that-resonates-with-inspiration
[tgi]: https://github.com/colinbruner/terraform-gcp-infra
[sveltekit]: https://kit.svelte.dev/
[mdsvex]: https://mdsvex.pngwn.io/
[shiki]: https://shiki.style/
