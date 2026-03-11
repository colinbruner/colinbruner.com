import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import { createHighlighter } from 'shiki';

const SHIKI_LANGS = [
	'javascript',
	'typescript',
	'bash',
	'shell',
	'python',
	'go',
	'yaml',
	'json',
	'html',
	'css',
	'svelte',
	'text',
	'hcl',
	'terraform',
	'sql',
	'dockerfile',
	'markdown'
];

const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: SHIKI_LANGS
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: true,
			rehypePlugins: [rehypeSlug],
			highlight: {
				highlighter(code, lang) {
					// Handle mermaid diagrams with client-side rendering
					if (lang === 'mermaid') {
						return `<div class="mermaid not-prose">${code}</div>`;
					}

					const validLang =
						lang && highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';

					const html = escapeSvelte(
						highlighter.codeToHtml(code, {
							lang: validLang,
							themes: {
								light: 'github-light',
								dark: 'github-dark'
							}
						})
					);
					return `{@html \`${html}\`}`;
				}
			}
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore missing static assets (images, PDFs, etc.) during prerender
				if (/\.(jpg|jpeg|png|gif|pdf|ico|svg|webp|woff2?)$/i.test(path)) {
					return;
				}
				throw new Error(message);
			},
			handleMissingId: 'ignore'
		}
	}
};

export default config;
