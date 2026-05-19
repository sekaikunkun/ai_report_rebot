/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', '"Noto Sans SC"', "sans-serif"],
        body: ['"Noto Sans SC"', '"Source Han Sans SC"', "sans-serif"]
      },
      colors: {
        ink: "#050816",
        panel: "rgba(12, 18, 38, 0.66)",
        line: "rgba(148, 163, 184, 0.2)",
        cyan: "#52e7ff",
        violet: "#9b7cff",
        bluecore: "#3b82f6"
      },
      boxShadow: {
        glow: "0 0 42px rgba(82, 231, 255, 0.18)",
        violet: "0 0 46px rgba(155, 124, 255, 0.16)"
      }
    }
  },
  plugins: []
};
