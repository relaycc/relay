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
  daisyui: {
    themes: [
              {
                relay: {
                  "primary": "#2b1fae",
                  "secondary": "#1e3a8a",
                  "accent": "#4c96ac",
                  "neutral": "#3D4451",
                  "base-100": "#FFFFFF",
                  "info": "#3ABFF8",
                  "success": "#36D399",
                  "warning": "#FBBD23",
                  "error": "#F87272",
                },
              },
            ],
          },
};
