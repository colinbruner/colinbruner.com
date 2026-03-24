# colinbruner.com

Source code for https://colinbruner.com — a static site built with SvelteKit, Tailwind CSS, and mdsvex.

## Stack

- [SvelteKit](https://kit.svelte.dev) with `@sveltejs/adapter-static` for static site generation
- [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/typography` for styling
- [mdsvex](https://mdsvex.pngwn.io) for Markdown blog posts (`.md` files as Svelte routes)
- [Shiki](https://shiki.style) for syntax highlighting (light/dark themes via `github-light`/`github-dark`)

## Development

```
npm install
npm run dev
```

## Building

```
npm run build
```

Output is written to `build/`.
