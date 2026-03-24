<script>
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>#{data.tag} — Colin Bruner</title>
	<meta name="description" content="Posts tagged #{data.tag} by Colin Bruner." />
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
	<header class="mb-10">
		<div class="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 mb-3">
			<a
				href="/tags"
				class="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
			>
				Topics
			</a>
			<span aria-hidden="true">/</span>
			<span>#{data.tag}</span>
		</div>
		<h1
			class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
		>
			#{data.tag}
		</h1>
		<p class="text-slate-500 dark:text-slate-400">
			{data.posts.length}
			{data.posts.length === 1 ? 'post' : 'posts'}
		</p>
	</header>

	{#if data.posts.length > 0}
		<div>
			{#each data.posts as post}
				<PostCard {post} />
			{/each}
		</div>
	{:else}
		<p class="text-slate-400 dark:text-slate-500">No posts with this tag.</p>
	{/if}
</div>
