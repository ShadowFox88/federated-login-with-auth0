const daisyUI = require("daisyui");
const tailwindCSSTypography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.tsx"],
    plugins: [daisyUI, tailwindCSSTypography],
};
