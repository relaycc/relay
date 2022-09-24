/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {},
    screens: {
      xs: "375px",
      sm: "588px",
      md: "868px",
      lg: "1148px",
      xl: "1428px",
      xxl: "1708px",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
