/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2C3E50", // Rich Navy Blue
        "primary-dark": "#1A252F", // Darker Navy
        secondary: "#E67E22", // Warm Orange
        "secondary-dark": "#D35400", // Darker Warm Orange (fixed missing color)
        accent: "#27AE60", // Emerald Green
        background: "#ECF0F1", // Light Gray
        foreground: "#2C3E50", // Navy Blue (for text)
        card: "#FFFFFF", // Pure White
        "card-shadow": "#BDC3C7", // Light Gray for shadows
        "input-border": "#95A5A6", // Medium Gray
        "input-focus": "#3498DB", // Bright Blue
        success: "#27AE60", // Emerald Green
        error: "#E74C3C", // Bright Red
        warning: "#F1C40F", // Bright Yellow
        info: "#3498DB", // Bright Blue
        muted: "#7F8C8D", // Muted Gray
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        hover:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
