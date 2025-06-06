/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Shadcn/ui will likely add its component paths here or ensure they are covered by ./src
  ],
  theme: {
    extend: {
      // Shadcn/ui will populate this section (colors, borderRadius, keyframes, etc.)
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Shadcn/ui will add require("tailwindcss-animate") here
  ],
}
