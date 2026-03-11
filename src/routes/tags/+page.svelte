<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Tags — Colin Bruner</title>
	<meta name="description" content="Browse posts by topic on Colin Bruner's blog." />
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
	<header class="mb-10">
		<h1
			class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
		>
			Topics
		</h1>
		<p class="text-slate-500 dark:text-slate-400">Browse posts by topic.</p>
	</header>

	{#if data.tags.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each data.tags as { tag, count }}
				<a
					href="/tags/{tag}"
					class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
				>
					<span class="font-medium">#{tag}</span>
					<span
						class="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full"
					>
						{count}
					</span>
				</a>
			{/each}
		</div>
	{:else}
		<p class="text-slate-400 dark:text-slate-500">No tags found.</p>
	{/if}
</div>
