/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      // Enhanced night theme colors
      background: "#0F172A", // Rich navy background (Slate 900)
      foreground: "#F1F5F9", // Crisp white text (Slate 100)
      primary: "#1E293B", // Deep blue for primary elements (Slate 800)
      secondary: "#334155", // Medium blue for navbar (Slate 700)
      highlight: "#94A3B8", // Subtle blue highlights (Slate 400)
      accent: "#8B5CF6", // Vibrant purple accent (Violet 500)
      indigo: {
        400: "#818CF8", // Lighter indigo for hover states
        500: "#6366F1", // Primary indigo
        600: "#4F46E5", // Darker indigo for active states
      },
      // Supporting colors
      success: "#10B981", // Emerald 500
      warning: "#F59E0B", // Amber 500
      error: "#EF4444", // Red 500
      "gray-dark": "#334155", // Slate 700
      gray: "#64748B", // Slate 500
      "gray-light": "#CBD5E1", // Slate 300
      // Additional accent colors
      purple: {
        400: "#A78BFA",
        500: "#8B5CF6",
        600: "#7C3AED",
      },
      slate: {
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
});
