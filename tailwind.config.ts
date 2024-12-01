import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
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
  			},
  			artcade: {
  				aqua: '#52DBFF',
  				purple: '#7637FE',
  				pink: '#FF3DDC',
  				tangerine: '#FF3D5D',
  				yellow: '#FDECCF',
  			},
  			tint: {
  				white: 'rgba(255, 255, 255, var(--tw-bg-opacity))',
  				black: 'rgba(0, 0, 0, var(--tw-bg-opacity))',
  			},
  			unicorn: {
  				pink: '#FF69B4',
  				purple: '#9B6DFF',
  				blue: '#87CEEB',
  				yellow: '#FFD700',
  				mint: '#98FF98'
  			}
  		},
  		backgroundImage: {
  			'primary-gradient': 'linear-gradient(180deg, #52DBFF 22%, #7637FE 52.5%, #FF3DDC 73.49%)',
  			'unicorn-gradient': 'linear-gradient(45deg, #FF69B4 0%, #9B6DFF 25%, #87CEEB 50%, #FFD700 75%, #98FF98 100%)',
  			'unicorn-shimmer': 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontSize: {
  			'xs': ['.75rem', { lineHeight: '1.1rem' }],
			'sm': ['1.1rem', { lineHeight: '1.1rem' }],
  		},
  		fontFamily: {
  			monoton: ['Monoton', 'cursive'],
  			sans: ['var(--font-geist-sans)', 'system-ui'],
  			mono: ['var(--font-geist-mono)', 'monospace'],
  		},
  		backdropBlur: {
  			'xs': '2px',
  			'sm': '4px',
  			'md': '8px',
  			'lg': '12px',
  			'xl': '16px',
  			'2xl': '24px',
  			'3xl': '30px',

  		},
  		boxShadow: {
  			'glass': '0 0 10px 0 rgba(255, 255, 255, 0.1)',
  		},
  		animation: {
  			'shimmer': 'shimmer 2s linear infinite',
  			'rainbow': 'rainbow 8s linear infinite'
  		},
  		keyframes: {
  			shimmer: {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' }
  			},
  			rainbow: {
  				'0%': { filter: 'hue-rotate(0deg)' },
  				'100%': { filter: 'hue-rotate(360deg)' }
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
