/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#688E26',
                secondary: '#236667',
                light-green: '#F1F7ED',
                light-black: '#222B26',
                background: '#100905'
            }
        },
    },
    plugins: [],
}