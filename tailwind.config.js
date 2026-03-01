/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B2341", // Navy
        accent: "#E5B181", // Gold
        lightbg: "#F8F9FB",
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Default font
        poppins: ["Poppins", "sans-serif"],
      },

      fontSize: {
        hero: ["3rem", { lineHeight: "1.2" }], // Big hero titles
        section: ["2rem", { lineHeight: "1.3" }], // Section headings
      },

      letterSpacing: {
        widePlus: "0.05em",
      },

      borderRadius: {
        xl2: "1.25rem",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
