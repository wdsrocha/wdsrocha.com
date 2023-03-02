const radixColors = require("@radix-ui/colors");

const primary = Object.entries(radixColors.pink).reduce(
  (previousValue, [key, value]) => ({
    ...previousValue,
    [key.replace("pink", "")]: value,
  }),
  {}
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary,
      },
    },
  },
  plugins: [
    require("windy-radix-palette"),
    require("@tailwindcss/typography"),
    require("windy-radix-typography"),
  ],
};
