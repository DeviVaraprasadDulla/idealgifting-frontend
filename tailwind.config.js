/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ===== Client reference design system =====
        navy: {
          DEFAULT: "#0F2140",
          700: "#1B3766",
          500: "#37568C",
        },
        ink: "#0A1526",
        ivory: "#FCF8F1",
        cream: "#F5EADB",
        paper: "#FFFFFF",
        peach: {
          DEFAULT: "#F3C39C",
          deep: "#E5A170",
        },
        gold: "#C79A5B",
        blush: "#EBAEB4",
        burgundy: "#7C2B3E",
        coral: "#EF7A5C",
        sun: "#F0BE4C",
        lavender: "#B7A6DD",
        sky: "#9BC6E5",
        leaf: "#7FA88A",
        muted: "#6B7A93",

        // Runtime "color world" tokens - value set per [data-world] in index.css
        world: "var(--w)",
        "world-soft": "var(--w-soft)",
        "world-deep": "var(--w-deep)",

        // Legacy tokens kept as aliases during the page-by-page migration
        primary: "#0F2140",
        accent: "#E5A170",
        lightbg: "#FCF8F1",
      },

      fontFamily: {
        sans: ["Instrument Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "Times New Roman", "serif"],
        num: ["Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
        poppins: ["Poppins", "sans-serif"], // retained until fully migrated
      },

      fontSize: {
        hero: ["3rem", { lineHeight: "1.2" }],
        section: ["2rem", { lineHeight: "1.3" }],
        d1: ["clamp(2.9rem, 7vw, 5.4rem)", { lineHeight: "1.08" }],
        d2: ["clamp(2.25rem, 4.7vw, 3.7rem)", { lineHeight: "1.08" }],
        d3: ["clamp(1.6rem, 2.8vw, 2.3rem)", { lineHeight: "1.15" }],
        d4: ["clamp(1.22rem, 1.8vw, 1.48rem)", { lineHeight: "1.2" }],
      },

      letterSpacing: {
        widePlus: "0.05em",
        headline: "-0.012em",
      },

      borderRadius: {
        xl2: "1.25rem", // legacy
        rs: "10px",
        rm: "18px",
        rl: "30px",
        rxl: "44px",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)", // legacy
        card: "0 1px 2px rgba(15,33,64,.05), 0 10px 26px -16px rgba(15,33,64,.35)",
        elevated: "0 30px 70px -34px rgba(15,33,64,.45)",
        lift: "0 40px 80px -38px rgba(15,33,64,.55)",
      },

      maxWidth: {
        wrap: "1280px",
        "wrap-narrow": "880px",
      },
    },
  },
  plugins: [],
};
