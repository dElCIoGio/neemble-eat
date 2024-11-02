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
                'poppins': ['Poppins', 'sans-serif'], // Basic definition to use the font across Tailwind classes
            },
            fontWeight: {
                'poppins-regular': '400',
                'poppins-light': '300',
                'poppins-medium': '500',
                'poppins-semibold': '600',
            },
            screens: {
                "tablet": "480px",
                "laptop": "768px",
                "desktop": "1024px",
                "tv": "1200px",
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
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
                }
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

