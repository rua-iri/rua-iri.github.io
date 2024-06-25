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
          "primary": "#d65d0e",
          "secondary": "#af3a03",
          "accent": "#427b58",
          "neutral": "#3c3836",
          "neutral-content": "#fbf1c7",
          "base-100": "#f9f5d7",
          "base-content": "#3c3836",
          "--rounded-box": "0.25rem",
          "--rounded-btn": ".125rem",
          "--rounded-badge": ".125rem",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-focus-scale": "1",
        },
      },
      {
        dim: {
          "color-scheme": "dark",
          "primary": "#1C4E80",
          "secondary": "#d65d0e",
          "accent": "#EA6947",
          "neutral": "#23282E",
          "base-100": "#1d2021",
          "base-content": "#fbf1c7",
          "info": "#0091D5",
          "success": "#6BB187",
          "warning": "#DBAE59",
          "error": "#AC3E31",
          "--rounded-box": "0.25rem",
          "--rounded-btn": ".125rem",
          "--rounded-badge": ".125rem",
        },
      },
    ],
    darkTheme: "dim",
  },
};
