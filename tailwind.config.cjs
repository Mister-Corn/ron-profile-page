/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        summerYellow: "rgb(var(--clr-summer-yellow) / <alpha-value>)",
        pastelGreen: "rgb(var(--clr-pastel-green) / <alpha-value>)",
        boldPurple: "rgb(var(--clr-bold-purple) / <alpha-value>)",
        hotPink: "rgb(var(--clr-hot-pink) / <alpha-value>)",
      },
      fontFamily: {
        audiowide: ["Audiowide", "cursive"],
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
