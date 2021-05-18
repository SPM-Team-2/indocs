const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#141821",
        slightWhite: "#F2F4FF",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        lobster: ["Lobster", "Nunito"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".skew-10deg": {
          transform: "skewY(-10deg)",
        },
        ".skew-15deg": {
          transform: "skewY(-15deg)",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
