import { getAllPosts } from '$lib/posts.js';
import { error } from '@sveltejs/kit';

export function entries() {
	// Only prerender published posts; drafts are excluded from the static build
	return getAllPosts(false).map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	const allPosts = getAllPosts(true);
	const post = allPosts.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, `Post not found: ${params.slug}`);
	}

	// Build prev/next from published posts only
	const published = getAllPosts();
	const idx = published.findIndex((p) => p.slug === params.slug);
	const prevPost = idx < published.length - 1 ? published[idx + 1] : null;
	const nextPost = idx > 0 ? published[idx - 1] : null;

	return { ...post, prevPost, nextPost };
}
