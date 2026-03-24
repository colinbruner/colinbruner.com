import { getAllPosts } from '$lib/posts.js';

export function load() {
	const posts = getAllPosts().slice(0, 5);
	return { posts };
}
