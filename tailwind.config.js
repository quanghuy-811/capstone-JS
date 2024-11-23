/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./customer/**/*.{html,js}",
    "./admin/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        philosopher: ["Philosopher", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        kode: ["Kode Mono", "monospace"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  mode: "jit",
};
