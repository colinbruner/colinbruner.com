import { getAllTags } from '$lib/posts.js';

export function load() {
	const tags = getAllTags();
	return { tags };
}
