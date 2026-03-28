<script>
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();

	const socialLinks = [
		{
			label: 'GitHub',
			href: 'https://github.com/colinbruner',
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
			external: true
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/colinbruner/',
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
			external: true
		},
		{
			label: 'Mastodon',
			href: 'https://mastodon.social/@colinbruner',
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg>`,
			external: true
		},
		{
			label: 'Email',
			href: 'mailto:hello@colinbruner.com',
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
			external: false
		},
		{
			label: 'Resume',
			href: '/resume',
			icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
			external: true
		}
	];
</script>

<svelte:head>
	<title>Colin Bruner — Principal Engineer</title>
	<meta
		name="description"
		content="Colin Bruner is a Principal Engineer focused on cloud infrastructure, platform engineering, and distributed systems."
	/>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6">
	<!-- Hero -->
	<section class="pt-16 pb-12">
		<div class="flex items-start gap-5 sm:gap-6 mb-8">
			<!-- Avatar -->
			<div class="shrink-0">
				<div
					class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-indigo-500/20 dark:ring-indigo-500/30 bg-slate-200 dark:bg-slate-800 flex items-center justify-center"
				>
					<img
						src="/images/avatar.jpg"
						alt="Colin Bruner"
						class="w-full h-full object-cover"
						onerror={(e) => {
							e.currentTarget.style.display = 'none';
							e.currentTarget.parentElement.querySelector('.initials').style.display = 'flex';
						}}
					/>
					<span
						class="initials hidden text-2xl font-bold text-slate-500 dark:text-slate-400 absolute inset-0 items-center justify-center"
						aria-hidden="true"
					>
						CB
					</span>
				</div>
			</div>

			<!-- Name + Title -->
			<div class="pt-1">
				<h1
					class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-1"
				>
					Colin Bruner
				</h1>
				<p class="text-indigo-600 dark:text-indigo-400 font-medium text-sm sm:text-base mb-3">
					Principal Engineer
				</p>
				<p
					class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm sm:max-w-md text-balance"
				>
					Cloud infrastructure, platform engineering, and distributed systems. Building
					reliable, scalable systems at the intersection of Dev and Ops.
				</p>
			</div>
		</div>

		<!-- Social Links -->
		<div class="flex flex-wrap items-center gap-1">
			{#each socialLinks as { label, href, icon, external }}
				<a
					{href}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener noreferrer' : undefined}
					aria-label={label}
					class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
				>
					{@html icon}
					<span class="hidden sm:inline">{label}</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- Recent Writing -->
	<section class="pb-16">
		<div class="flex items-center justify-between mb-6">
			<h2
				class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest"
			>
				Recent Writing
			</h2>
			<a
				href="/blog"
				class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors font-medium"
			>
				View all →
			</a>
		</div>

		{#if data.posts.length > 0}
			<div>
				{#each data.posts as post}
					<PostCard {post} />
				{/each}
			</div>
		{:else}
			<p class="text-slate-500 dark:text-slate-400 text-sm">No posts yet. Check back soon.</p>
		{/if}
	</section>
</div>
