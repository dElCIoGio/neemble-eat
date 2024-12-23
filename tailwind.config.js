/** @type {import('tailwindcss').Config} */
import lineClamp from "@tailwindcss/line-clamp"

const plugin = require('tailwindcss/plugin');

export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}"
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			poppins: [
    				'Poppins',
    				'sans-serif'
    			]
    		},
    		fontWeight: {
    			'poppins-regular': '400',
    			'poppins-light': '300',
    			'poppins-medium': '500',
    			'poppins-semibold': '600'
    		},
    		screens: {
    			tablet: '480px',
    			laptop: '768px',
    			desktop: '1024px',
    			tv: '1200px'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			dark_purple: {
    				'100': '#07060b',
    				'200': '#0e0d16',
    				'300': '#151321',
    				'400': '#1c192c',
    				'500': '#242038',
    				'600': '#463f6d',
    				'700': '#695ea2',
    				'800': '#9b93c1',
    				'900': '#cdc9e0',
    				DEFAULT: '#242038'
    			},
    			amethyst: {
    				'100': '#1c112c',
    				'200': '#392157',
    				'300': '#553283',
    				'400': '#7142af',
    				'500': '#9067c6',
    				'600': '#a686d1',
    				'700': '#bda4dc',
    				'800': '#d3c2e8',
    				'900': '#e9e1f3',
    				DEFAULT: '#9067c6'
    			},
    			tropical_indigo: {
    				'100': '#17152e',
    				'200': '#2f2a5d',
    				'300': '#463f8b',
    				'400': '#6259b4',
    				'500': '#8d86c9',
    				'600': '#a59fd4',
    				'700': '#bbb7df',
    				'800': '#d2cfe9',
    				'900': '#e8e7f4',
    				DEFAULT: '#8d86c9'
    			},
    			french_gray: {
    				'100': '#29252c',
    				'200': '#524958',
    				'300': '#7b6e84',
    				'400': '#a399aa',
    				'500': '#cac4ce',
    				'600': '#d5d0d8',
    				'700': '#dfdce2',
    				'800': '#eae8ec',
    				'900': '#f4f3f5',
    				DEFAULT: '#cac4ce'
    			},
    			linen: {
    				'100': '#4b2f14',
    				'200': '#965f28',
    				'300': '#d08e4d',
    				'400': '#e4be98',
    				'500': '#f7ece1',
    				'600': '#f9f1e8',
    				'700': '#fbf4ee',
    				'800': '#fcf8f4',
    				'900': '#fefbf9',
    				DEFAULT: '#f7ece1'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		keyframes: {
    			'spinner-leaf-fade': {
    				'0%, 100%': {
    					opacity: '0'
    				},
    				'50%': {
    					opacity: '1'
    				}
    			},
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
    			'spinner-leaf-fade': 'spinner-leaf-fade 800ms linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
    plugins: [
        plugin(function ({
                             addVariant,
                             e,
                             postcss
                         }) {
            addVariant('firefox', ({
                                       container,
                                       separator
                                   }) => {
                const isFirefoxRule = postcss.atRule({
                    name: '-moz-document',
                    params: 'url-prefix()',
                });
                isFirefoxRule.append(container.nodes);
                container.append(isFirefoxRule);
                isFirefoxRule.walkRules((rule) => {
                    rule.selector = `.${e(
                        `firefox${separator}${rule.selector.slice(1)}`
                    )}`;
                });
            });
        }),
        require("tailwindcss-animate"),
        lineClamp
    ],
}

