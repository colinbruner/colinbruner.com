<script>
	const techStack = [
		{ category: 'Cloud', items: ['GCP', 'AWS', 'Cloudflare'] },
		{ category: 'Infrastructure', items: ['Terraform', 'Kubernetes', 'Helm', 'Ansible'] },
		{
			category: 'Serverless & Events',
			items: ['Cloud Functions', 'Lambda', 'Pub/Sub', 'EventArc']
		},
		{ category: 'CI/CD & Automation', items: ['GitHub Actions', 'ArgoCD'] },
		{ category: 'Containers', items: ['Docker', 'Kubernetes'] },
		{ category: 'Languages', items: ['Go', 'Python', 'Bash', 'HCL'] }
	];

	const certifications = [
		{ name: 'GCP Professional Cloud Architect', href: 'https://www.credly.com/badges/b3458027-796a-4c4a-8f86-3f1d4baaa6bf' },
		{ name: 'AWS Solutions Architect – Associate', file: '/certificates/aws-solutions-architect-associate.pdf' },
		{ name: 'Docker Certified Associate', file: '/certificates/docker-certified-associate.pdf' },
		{ name: 'RHCSA 7', href: 'https://rhtapps.redhat.com/verify?certId=160-041-406' }
	];
</script>

<svelte:head>
	<title>About — Colin Bruner</title>
	<meta
		name="description"
		content="About Colin Bruner — Principal Engineer focused on cloud infrastructure and platform engineering."
	/>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
	<!-- Page header -->
	<header class="mb-10">
		<h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
			About
		</h1>
		<p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
			Principal Engineer based in the Chicago suburbs, focused on cloud infrastructure,
			platform engineering, and building reliable distributed systems.
		</p>
	</header>

	<div class="space-y-10 text-slate-600 dark:text-slate-400 leading-relaxed">
		<!-- Intro -->
		<section>
			<p class="mb-4">
				Hey, I'm Colin. I've spent my career designing and operating large-scale infrastructure —
				from managing root DNS nameservers handling billions of queries per day at Verisign, to
				leading cloud migrations and building event-driven automation platforms.
			</p>
			<p class="mb-4">
				I'm passionate about systems thinking, infrastructure-as-code, and the craft of building
				infrastructure that just <em>works</em> — reliably, at scale, with minimal operational
				toil.
			</p>
			<p>
				This blog is where I document things I build, problems I solve, and ideas I'm thinking
				through. If something's useful to you, that's a bonus.
			</p>
		</section>

		<!-- Career -->
		<section>
			<h2
				class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5"
			>
				My Background
			</h2>

			<div class="space-y-6">
				<div class="pl-4 border-l-2 border-indigo-500/30 dark:border-indigo-500/20">
					<p class="text-xs font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-wider mb-0.5">
						The Start
					</p>
					<p class="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
						Folin Financial <span class="font-normal text-slate-400 dark:text-slate-500">(acquired by Goldman Sachs)</span>
					</p>
					<p class="text-sm">
						Everyone has to start somewhere. Mine was a financial back-office role that turned into an unexpected
						doorway into technology. I taught myself enough to earn a seat at the table as a Junior UNIX
						Administrator — and never looked back. It's where I discovered a genuine love for automation and
						the satisfaction of making systems do the work for you. Solaris, Red Hat Linux, and a healthy
						respect for production environments were the early building blocks.
					</p>
				</div>

				<div class="pl-4 border-l-2 border-indigo-500/30 dark:border-indigo-500/20">
					<p class="text-xs font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-wider mb-0.5">
						The Foundation
					</p>
					<p class="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
						Verisign — Resolution Operations
					</p>
					<p class="text-sm">
						If you've ever typed a <code class="text-xs">.com</code> or <code class="text-xs">.net</code>
						address into a browser, there's a good chance my work was involved. At Verisign I helped operate
						two of the 13 global root nameservers — a.root and j.root — and the DNS resolution infrastructure
						handling roughly 3 million queries per second worldwide. This is where I learned what it truly
						means to build and run reliable systems at scale. I also had the privilege of traveling the globe
						— London, Amsterdam, Tokyo, Frankfurt, and beyond — standing up datacenters and keeping the
						internet's critical infrastructure humming. It gave me a deep, firsthand understanding of how
						things actually work beneath the surface.
					</p>
				</div>

				<div class="pl-4 border-l-2 border-indigo-500/30 dark:border-indigo-500/20">
					<p class="text-xs font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-wider mb-0.5">
						The Expansion
					</p>
					<p class="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
						ID.me
					</p>
					<p class="text-sm">
						ID.me is where I made the leap into cloud-native engineering at scale. I joined a fast-moving
						platform team and quickly found myself deep in the work of modernizing infrastructure — leading
						a full migration from AWS to GCP, building event-driven automation pipelines using EventArc,
						Pub/Sub, and Cloud Functions, and going deep on HashiCorp's ecosystem with Terraform, Vault, and
						Consul. Kubernetes stopped being a buzzword and became the daily reality. Just as importantly,
						this role gave me a broader view of what it takes to run a technology organization — the people,
						the processes, and the tradeoffs that never show up in documentation.
					</p>
				</div>

				<div class="pl-4 border-l-2 border-indigo-500/30 dark:border-indigo-500/20">
					<p class="text-xs font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-wider mb-0.5">
						The Pivot
					</p>
					<p class="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
						CME Group
					</p>
					<p class="text-sm">
						CME Group was a deliberate pivot — a return to the financial sector and a sharpening of focus.
						With GCP as the sole cloud platform, I was able to go deeper rather than wider, building
						expertise and earning the GCP Professional Cloud Architect certification along the way. Working
						within a highly regulated, operationally rigorous environment reinforced the discipline that
						large-scale financial infrastructure demands.
					</p>
				</div>

				<div class="pl-4 border-l-2 border-indigo-500/30 dark:border-indigo-500/20">
					<p class="text-xs font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-wider mb-0.5">
						The Mastering
					</p>
					<p class="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
						Wells Fargo
					</p>
					<p class="text-sm">
						Today I'm a Principal Engineer at Wells Fargo, leading a team focused on modernizing one of the
						largest financial institutions in the world. The work centers on what I've always loved most —
						automation and integration through APIs — applied at a scale that genuinely matters. We're
						building the connective tissue that lets a complex, decades-old organization move faster and more
						reliably. It's the kind of challenge that draws on everything that came before it.
					</p>
				</div>

				<div class="pl-4 border-l-2 border-slate-200 dark:border-slate-700">
					<p class="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-0.5">
						Education
					</p>
					<p class="text-sm">
						B.S. Management Information Systems, Oklahoma State University.
					</p>
				</div>
			</div>
		</section>

		<!-- Tech Stack -->
		<section>
			<h2
				class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5"
			>
				Tech I Work With
			</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each techStack as { category, items }}
					<div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
						<p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
							{category}
						</p>
						<div class="flex flex-wrap gap-1.5">
							{#each items as item}
								<span
									class="text-xs px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
								>
									{item}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Certifications -->
		<section>
			<h2
				class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5"
			>
				Certifications
			</h2>
			<ul class="space-y-2">
				{#each certifications as cert}
					<li>
						<a
							href={cert.file || cert.href}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
						>
							<svg
								class="w-3.5 h-3.5 shrink-0"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
								<polyline points="14 2 14 8 20 8" />
							</svg>
							{cert.name}
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Contact -->
		<section>
			<h2
				class="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5"
			>
				Get in Touch
			</h2>
			<p class="text-sm mb-3">
				Feel free to reach out. I'm not always fast to respond but I do reply.
			</p>
			<div class="flex flex-wrap gap-3">
				<a
					href="mailto:hello@colinbruner.com"
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
						<rect x="2" y="4" width="20" height="16" rx="2" />
						<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
					</svg>
					Email me
				</a>
				<a
					href="/resume"
					target="_blank"
					rel="noopener noreferrer"
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
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
					</svg>
					View Resume
				</a>
			</div>
		</section>
	</div>
</div>
