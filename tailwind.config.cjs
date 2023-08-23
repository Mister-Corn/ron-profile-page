/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        summerYellow: "rgb(255 255 105 / <alpha-value>)",
        pastelGreen: "rgb(105 255 180 / <alpha-value>)",
        boldPurple: "rgb(151 67 226 / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
