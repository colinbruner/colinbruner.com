<script>
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog — Colin Bruner</title>
	<meta
		name="description"
		content="Thoughts on cloud infrastructure, platform engineering, distributed systems, and the craft of software."
	/>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
	<header class="mb-10">
		<h1
			class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3"
		>
			Writing
		</h1>
		<p class="text-slate-500 dark:text-slate-400 leading-relaxed">
			Thoughts on cloud infrastructure, platform engineering, distributed systems, and the
			craft of building things that scale.
		</p>
	</header>

	{#if data.posts.length > 0}
		<div>
			{#each data.posts as post}
				<PostCard {post} />
			{/each}
		</div>
	{:else}
		<div class="py-16 text-center">
			<p class="text-slate-400 dark:text-slate-500">No posts yet.</p>
		</div>
	{/if}
</div>
