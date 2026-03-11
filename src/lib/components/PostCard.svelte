<script>
	import { shortDate } from '$lib/posts.js';

	/** @type {{ slug: string, title: string, date: string, description?: string, tags?: string[], readingTime?: number }} */
	let { post } = $props();
</script>

<article
	class="group relative py-5 border-b border-slate-200 dark:border-slate-800 last:border-0 first:pt-0"
>
	<div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
		<a
			href="/blog/{post.slug}"
			class="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug"
		>
			{post.title}
		</a>
		<div class="flex items-center gap-2 shrink-0 text-xs text-slate-400 dark:text-slate-500">
			<time datetime={post.date}>{shortDate(post.date)}</time>
			{#if post.readingTime}
				<span aria-hidden="true">·</span>
				<span>{post.readingTime} min read</span>
			{/if}
		</div>
	</div>

	{#if post.description}
		<p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
			{post.description}
		</p>
	{/if}

	{#if post.tags?.length}
		<div class="flex flex-wrap gap-1.5 mt-2.5">
			{#each post.tags as tag}
				<a
					href="/tags/{tag}"
					class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
				>
					#{tag}
				</a>
			{/each}
		</div>
	{/if}
</article>
