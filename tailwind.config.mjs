/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          'dark': '#1a0a2e',
          'purple': '#2d1052',
          'violet': '#3d1a6e',
          'magenta': '#e43ad7',
          'cyan': '#5ce1e6',
          'pink': '#d63384',
        },
      },
      fontFamily: {
        'sans': ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
