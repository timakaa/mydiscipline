/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: 'var(--primary)',
  			'primary-hover': 'var(--primary-hover)',
  			card: 'var(--card)',
  			'base-100': 'var(--base-100)',
  			simple: 'var(--simple)',
  			'ghost-hover': 'var(--ghost-hover)',
  			'ghost-hover-text': 'var(--ghost-hover-text)'
  		},
  		keyframes: {
  			shake: {
  				'0%, 100%': {
  					transform: 'rotate(0deg)'
  				},
  				'25%': {
  					transform: 'rotate(-1deg)'
  				},
  				'75%': {
  					transform: 'rotate(1deg)'
  				}
  			},
  			gradient: {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%'
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
  			shake: 'shake 0.3s ease-in-out infinite',
  			gradient: 'gradient 6s ease infinite alternate',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		backgroundSize: {
  			'300%': '300%'
  		}
  	}
  },
  daisyui: {
    themes: [
      {
        business: {
          ...require("daisyui/src/theming/themes")["business"],
          "--primary": "#ffa000",
          "--primary-hover": "#ff8f00",
          "--card": "#262626",
          "--base-100": "#202020",
          "--simple": "var(--base-300)",
          "--ghost-hover": "#cdcdcd33",
          "--ghost-hover-text": "var(--base-content)",
        },
        lofi: {
          ...require("daisyui/src/theming/themes")["cmyk"],
          "--primary": "#ffab00",
          "--primary-hover": "#ffa000",
          "--card": "#ffffff",
          "--base-100": "#fbfafa",
          "--simple": "#ffffff",
          "--ghost-hover": "#000000",
          "--ghost-hover-text": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
