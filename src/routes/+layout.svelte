<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="author" content="Colin Bruner" />
	<!-- Mermaid.js for diagram rendering in blog posts -->
	<script
		type="module"
		src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
	></script>
</svelte:head>

<div class="min-h-screen flex flex-col bg-white dark:bg-slate-950">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
