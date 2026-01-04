import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					'50': '#eff6ff',
					'100': '#dbeafe',
					'200': '#bfdbfe',
					'300': '#93c5fd',
					'400': '#60a5fa',
					'500': '#3b82f6',
					'600': '#2563eb',
					'700': '#1d4ed8',
					'800': '#1e40af',
					'900': '#1e3a8a',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					'50': '#ecfdf5',
					'100': '#d1fae5',
					'200': '#a7f3d0',
					'300': '#6ee7b7',
					'400': '#34d399',
					'500': '#10b981',
					'600': '#059669',
					'700': '#047857',
					'800': '#065f46',
					'900': '#064e3b',
					DEFAULT: '#10b981'
				},
				warning: {
					'500': '#f59e0b',
					DEFAULT: '#f59e0b'
				},
				error: {
					'500': '#ef4444',
					DEFAULT: '#ef4444'
				},
				environment: '#10b981',
				education: '#3b82f6',
				health: '#ef4444',
				animals: '#f59e0b',
				community: '#8b5cf6',
				hunger: '#f97316',
				linear: {
					'50': '#f7f8f8',
					'100': '#edeef0',
					'200': '#d7dadf',
					'300': '#b6bcc6',
					'400': '#8e98a8',
					'500': '#6c788e',
					'600': '#545f73',
					'700': '#454d5d',
					'800': '#3a404c',
					'900': '#323741',
					'950': '#22252b',
				},
				peer: {
					green: '#00aa45',
					hover: '#00993e'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [
					'var(--font-geist-sans)',
					'Inter',
					'system-ui',
					'sans-serif'
				],
				display: [
					'var(--font-geist-sans)',
					'Inter',
					'sans-serif'
				]
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
