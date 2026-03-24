/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'sans-serif'
				],
				mono: [
					'"JetBrains Mono"',
					'ui-monospace',
					'SFMono-Regular',
					'Menlo',
					'Monaco',
					'"Cascadia Code"',
					'"Fira Code"',
					'monospace'
				]
			},
			colors: {
				accent: {
					DEFAULT: '#6366f1',
					dark: '#818cf8'
				}
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: theme('colors.slate.700'),
						'h1, h2, h3, h4': {
							color: theme('colors.slate.900'),
							fontWeight: '700',
							letterSpacing: '-0.025em'
						},
						a: {
							color: theme('colors.indigo.600'),
							textDecoration: 'none',
							'&:hover': {
								color: theme('colors.indigo.500'),
								textDecoration: 'underline'
							}
						},
						'code::before': { content: 'none' },
						'code::after': { content: 'none' },
						code: {
							backgroundColor: theme('colors.slate.100'),
							color: theme('colors.slate.800'),
							padding: '0.125rem 0.375rem',
							borderRadius: '0.25rem',
							fontSize: '0.875em',
							fontWeight: '400'
						},
						pre: {
							backgroundColor: 'transparent',
							padding: '0',
							margin: '0',
							borderRadius: '0'
						},
						'pre code': {
							backgroundColor: 'transparent',
							color: 'inherit',
							fontSize: '0.875rem',
							padding: '0'
						},
						blockquote: {
							borderLeftColor: theme('colors.indigo.400'),
							color: theme('colors.slate.600'),
							fontStyle: 'normal',
							fontWeight: '400'
						}
					}
				},
				invert: {
					css: {
						color: theme('colors.slate.300'),
						'h1, h2, h3, h4': {
							color: theme('colors.slate.100')
						},
						a: {
							color: theme('colors.indigo.400'),
							'&:hover': {
								color: theme('colors.indigo.300')
							}
						},
						code: {
							backgroundColor: theme('colors.slate.800'),
							color: theme('colors.slate.200')
						},
						blockquote: {
							borderLeftColor: theme('colors.indigo.500'),
							color: theme('colors.slate.400')
						},
						strong: {
							color: theme('colors.slate.200')
						},
						'thead th': {
							color: theme('colors.slate.200')
						}
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
