/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/views/**/*.blade.php",
        "./resources/src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#137fec",
                "primary-dark": "#0f65bd",
                "background-light": "#f6f7f8",
                "background-dark": "#101922",
                "surface-light": "#ffffff",
                "surface-dark": "#1e2936",
                "border-light": "#e2e8f0",
                "border-dark": "#334155",
            },
            fontFamily: {
                display: ["Lexend", "sans-serif"],
                body: ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                lg: "1rem",
                xl: "1.5rem",
                full: "9999px",
            },
        },
    },
    plugins: [],
};
