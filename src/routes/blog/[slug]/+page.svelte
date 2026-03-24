<script>
	import { getPostModules, formatDate } from '$lib/posts.js';

	let { data } = $props();

	const modules = getPostModules();
	const PostContent = $derived(modules[`/src/content/posts/${data.slug}.md`]?.default);
</script>

<svelte:head>
	<title>{data.title} — Colin Bruner</title>
	<meta name="description" content={data.description ?? `${data.title} by Colin Bruner`} />
	<meta property="og:title" content={data.title} />
	{#if data.description}
		<meta property="og:description" content={data.description} />
	{/if}
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
	<!-- Tags -->
	{#if data.tags?.length}
		<div class="flex flex-wrap gap-1.5 mb-4">
			{#each data.tags as tag}
				<a
					href="/tags/{tag}"
					class="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
				>
					#{tag}
				</a>
			{/each}
		</div>
	{/if}

	<!-- Title -->
	<h1
		class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4 text-balance"
	>
		{data.title}
	</h1>

	<!-- Meta -->
	<div
		class="flex items-center gap-3 text-sm text-slate-400 dark:text-slate-500 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800"
	>
		<span>Colin Bruner</span>
		<span aria-hidden="true">·</span>
		<time datetime={data.date}>{formatDate(data.date)}</time>
		{#if data.readingTime}
			<span aria-hidden="true">·</span>
			<span>{data.readingTime} min read</span>
		{/if}
	</div>

	<!-- Content -->
	<article
		class="prose dark:prose-invert prose-slate prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none max-w-none"
	>
		{#if PostContent}
			<PostContent />
		{:else}
			<p>Loading post content...</p>
		{/if}
	</article>

	<!-- Navigation -->
	{#if data.prevPost || data.nextPost}
		<nav
			class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4"
			aria-label="Post navigation"
		>
			<div>
				{#if data.prevPost}
					<a
						href="/blog/{data.prevPost.slug}"
						class="group flex flex-col gap-1 text-sm"
					>
						<span class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
							<svg
								class="w-3.5 h-3.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
							Older
						</span>
						<span
							class="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-medium"
						>
							{data.prevPost.title}
						</span>
					</a>
				{/if}
			</div>

			<div class="text-right">
				{#if data.nextPost}
					<a
						href="/blog/{data.nextPost.slug}"
						class="group flex flex-col gap-1 text-sm items-end"
					>
						<span class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
							Newer
							<svg
								class="w-3.5 h-3.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</span>
						<span
							class="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-medium"
						>
							{data.nextPost.title}
						</span>
					</a>
				{/if}
			</div>
		</nav>
	{/if}
</div>
