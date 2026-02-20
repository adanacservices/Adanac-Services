/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
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
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            fontFamily: {
                sans: [
                    'var(--font-sans)', 'system-ui', 'sans-serif'
                ],
                display: [
                    'var(--font-display)', 'system-ui', 'sans-serif'
                ],
                serif: [
                    'var(--font-serif)', 'serif'
                ],
                mono: [
                    'var(--font-mono)', 'monospace'
                ]
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-up': 'slide-up 0.5s ease-out',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'glitch-after': 'glitch var(--after-duration) infinite linear alternate-reverse',
                'glitch-before': 'glitch var(--before-duration) infinite linear alternate-reverse'
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    }
                },
                'slide-up': {
                    '0%': {
                        transform: 'translateY(10px)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
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
                },
                glitch: {
                    '0%': { 'clip-path': 'inset(20% 0 50% 0)' },
                    '5%': { 'clip-path': 'inset(10% 0 60% 0)' },
                    '10%': { 'clip-path': 'inset(15% 0 55% 0)' },
                    '15%': { 'clip-path': 'inset(25% 0 35% 0)' },
                    '20%': { 'clip-path': 'inset(30% 0 40% 0)' },
                    '25%': { 'clip-path': 'inset(40% 0 20% 0)' },
                    '30%': { 'clip-path': 'inset(10% 0 60% 0)' },
                    '35%': { 'clip-path': 'inset(15% 0 55% 0)' },
                    '40%': { 'clip-path': 'inset(25% 0 35% 0)' },
                    '45%': { 'clip-path': 'inset(30% 0 40% 0)' },
                    '50%': { 'clip-path': 'inset(20% 0 50% 0)' },
                    '55%': { 'clip-path': 'inset(10% 0 60% 0)' },
                    '60%': { 'clip-path': 'inset(15% 0 55% 0)' },
                    '65%': { 'clip-path': 'inset(25% 0 35% 0)' },
                    '70%': { 'clip-path': 'inset(30% 0 40% 0)' },
                    '75%': { 'clip-path': 'inset(40% 0 20% 0)' },
                    '80%': { 'clip-path': 'inset(20% 0 50% 0)' },
                    '85%': { 'clip-path': 'inset(10% 0 60% 0)' },
                    '90%': { 'clip-path': 'inset(15% 0 55% 0)' },
                    '95%': { 'clip-path': 'inset(25% 0 35% 0)' },
                    '100%': { 'clip-path': 'inset(30% 0 40% 0)' }
                }
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} 