<script>
	import { page } from '$app/stores';

	const messages = {
		404: {
			headline: 'Page not found.',
			sub: 'The resource you requested has been decommissioned, moved, or never existed.',
			status: 'node: not found'
		},
		403: {
			headline: 'Access denied.',
			sub: "You don't have permission to access this resource.",
			status: 'permission denied'
		},
		500: {
			headline: 'Internal server error.',
			sub: 'Something broke on our end. It has been logged.',
			status: 'exit code 1'
		}
	};

	$: info = messages[$page.status] ?? {
		headline: 'Something went wrong.',
		sub: $page.error?.message ?? 'An unexpected error occurred.',
		status: `exit code ${$page.status}`
	};
</script>

<svelte:head>
	<title>{$page.status} — Colin Bruner</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col justify-center min-h-[70vh] pt-10 pb-16">
	<!-- Status badge -->
	<div class="mb-6">
		<span
			class="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-widest"
		>
			<span class="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
			HTTP {$page.status}
		</span>
	</div>

	<!-- Big status code -->
	<div class="mb-6 select-none" aria-hidden="true">
		<span
			class="text-[8rem] sm:text-[11rem] font-bold font-mono leading-none tracking-tighter text-slate-100 dark:text-slate-800"
		>
			{$page.status}
		</span>
	</div>

	<!-- Headline -->
	<h1
		class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3 -mt-4"
	>
		{info.headline}
	</h1>

	<p class="text-slate-500 dark:text-slate-400 mb-3 max-w-md">
		{info.sub}
	</p>

	<!-- Terminal-style detail -->
	<p class="font-mono text-xs text-slate-400 dark:text-slate-600 mb-10">
		$ resolve {typeof window !== 'undefined' ? window.location.pathname : ''} →
		<span class="text-red-400">{info.status}</span>
	</p>

	<!-- Actions -->
	<div class="flex flex-wrap gap-3">
		<a
			href="/"
			class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
		>
			<svg
				class="w-4 h-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
				<polyline points="9 22 9 12 15 12 15 22" />
			</svg>
			Go home
		</a>
		<a
			href="/blog/"
			class="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors"
		>
			<svg
				class="w-4 h-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
				<polyline points="14 2 14 8 20 8" />
				<line x1="16" y1="13" x2="8" y2="13" />
				<line x1="16" y1="17" x2="8" y2="17" />
				<polyline points="10 9 9 9 8 9" />
			</svg>
			Browse the blog
		</a>
	</div>
</div>
