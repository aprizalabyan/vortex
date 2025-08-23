import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // palet penuh (seperti tailwind default)
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // <- utama
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // token semantik (enak dipakai di komponen)
        primary: "#2563eb", // blue-600
        secondary: "#0ea5e9", // sky-500
        danger: "#ef4444", // red-500
        success: "#22c55e", // green-500
      },
    },
  },
  plugins: [],
} satisfies Config;
