const postModules = import.meta.glob('/src/content/posts/*.md', { eager: true });
const rawModules = import.meta.glob('/src/content/posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

/**
 * @param {boolean} includeUnpublished - include draft posts
 * @returns {Array} sorted posts array
 */
export function getAllPosts(includeUnpublished = false) {
	return Object.entries(postModules)
		.map(([path, module]) => {
			const slug = path.split('/').pop().replace('.md', '');
			const raw = /** @type {string} */ (rawModules[path] ?? '');
			// Strip frontmatter from raw content for word count
			const content = raw.replace(/^---[\s\S]*?---\n/, '');
			const words = content.split(/\s+/).filter(Boolean).length;
			const readingTime = Math.max(1, Math.ceil(words / 200));
			return {
				slug,
				readingTime,
				...module.metadata
			};
		})
		.filter((post) => includeUnpublished || !post.draft)
		.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * @returns {Record<string, any>} - map of path -> module
 */
export function getPostModules() {
	return postModules;
}

/**
 * Get all unique tags across all published posts
 * @returns {Array<{tag: string, count: number}>}
 */
export function getAllTags() {
	const posts = getAllPosts();
	const tagMap = {};
	for (const post of posts) {
		for (const tag of post.tags ?? []) {
			tagMap[tag] = (tagMap[tag] ?? 0) + 1;
		}
	}
	return Object.entries(tagMap)
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Format a date string to human-readable form
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

/**
 * Short date format
 * @param {string|Date} date
 * @returns {string}
 */
export function shortDate(date) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});
}
