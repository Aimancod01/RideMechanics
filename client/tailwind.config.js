import Flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", './public/index.html', "./src/**/*.{js,ts,jsx,tsx}", Flowbite.content()],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [Flowbite.plugin()],
};
