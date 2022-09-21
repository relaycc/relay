/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {},
    screens: {
      xs: "400px",
      sm: "768px",
      md: "1136px",
      lg: "1504px",
      xl: "1872px",
      "2xl": "2240px",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
