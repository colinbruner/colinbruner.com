import { getAllPosts, getAllTags } from '$lib/posts.js';
import { error } from '@sveltejs/kit';

export function entries() {
	return getAllTags().map(({ tag }) => ({ tag }));
}

export function load({ params }) {
	const { tag } = params;
	const posts = getAllPosts().filter((post) => post.tags?.includes(tag));

	if (posts.length === 0 && !getAllTags().some((t) => t.tag === tag)) {
		throw error(404, `Tag not found: ${tag}`);
	}

	return { tag, posts };
}
