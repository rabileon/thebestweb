/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "media", // 👈 Esto es clave
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Noto Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}