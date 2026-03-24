import { getAllPosts } from '$lib/posts.js';

export function load() {
	const posts = getAllPosts();
	return { posts };
}
