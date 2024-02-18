module.exports = {
  content: ["./hugo_stats.json"],
  darkMode: ['class'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Ubuntu", "sans-serif"],
      serif: ["Newsreader", "serif"],
      mono: ["Ubuntu Mono", "monospace"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        lit: {
          // ...require("daisyui/src/theming/themes")["[data-theme=corporate]"],
          "primary": "#793ef9",
          "primary-focus": "#570df8",
          "primary-content": "#ffffff",
          "secondary": "#af3a03",
          "secondary-focus": "#689d6a",
          "secondary-content": "#f9f5d7",

          "accent": "#427b58",
          "accent-focus": "#389d6a",
          "accent-content": "#f9f5d7",
          "neutral": "#928374",
          "neutral-focus": "#a89984",
          "neutral-content": "#f9f5d7",

          "base-100": "#fbf1c7",
          "base-200": "#ebdbb2",
          "base-300": "#d5c4a1",
          "base-content": "#282828",
          "info": "#458588",
          "success": "#98971a",
          "warning": "#d65d0e",
          "error": "#cc241d"
        },
      },
      {
        dim: {
          ...require("daisyui/src/theming/themes")["[data-theme=business]"],
        },
      },
    ],
    darkTheme: "dim",
  },
};
