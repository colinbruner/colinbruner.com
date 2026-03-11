<script>
	import ThemeToggle from './ThemeToggle.svelte';
	import { page } from '$app/state';

	const navLinks = [
		{ href: '/blog', label: 'Blog' },
		{ href: '/about', label: 'About' }
	];
</script>

<header
	class="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm"
>
	<div class="max-w-3xl mx-auto px-4 sm:px-6 flex h-14 items-center justify-between">
		<!-- Logo -->
		<a
			href="/"
			class="flex items-center gap-2.5 text-slate-900 dark:text-slate-100 hover:opacity-80 transition-opacity"
			aria-label="Colin Bruner — Home"
		>
			<span
				class="flex items-center justify-center w-7 h-7 rounded-md bg-indigo-600 text-white text-xs font-bold tracking-tight select-none"
				aria-hidden="true"
			>
				CB
			</span>
			<span class="hidden sm:inline font-semibold text-sm">Colin Bruner</span>
		</a>

		<!-- Nav -->
		<nav class="flex items-center gap-1" aria-label="Main navigation">
			{#each navLinks as { href, label }}
				<a
					{href}
					class="px-3 py-1.5 text-sm rounded-md transition-colors
						{page.url.pathname.startsWith(href)
						? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
						: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}"
				>
					{label}
				</a>
			{/each}
			<div class="ml-1">
				<ThemeToggle />
			</div>
		</nav>
	</div>
</header>
