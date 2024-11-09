/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        business: {
          ...require("daisyui/src/theming/themes")["business"],
          "--primary": "#ffa000",
          "--primary-hover": "#ff8f00",
        },
        cmyk: {
          ...require("daisyui/src/theming/themes")["cmyk"],
          "--primary": "#ffab00",
          "--primary-hover": "#ffa000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
