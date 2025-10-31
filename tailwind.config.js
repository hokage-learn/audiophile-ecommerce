/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Design System Colors
      colors: {
        primary: {
          DEFAULT: '#D87D4A',
          hover: '#FBAF85',
          light: '#FBAF85',
        },
        dark: {
          DEFAULT: '#101010',
          gray: '#101010',
        },
        light: {
          gray: '#F1F1F1',
          gray2: '#FAFAFA',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
      // Typography - Manrope Font Family
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      // Typography - Font Sizes
      fontSize: {
        h1: ['56px', { lineHeight: '58px', letterSpacing: '2px', fontWeight: '700' }],
        h2: ['40px', { lineHeight: '44px', letterSpacing: '1.5px', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '36px', letterSpacing: '1.15px', fontWeight: '700' }],
        h4: ['28px', { lineHeight: '38px', letterSpacing: '2px', fontWeight: '700' }],
        h5: ['24px', { lineHeight: '33px', letterSpacing: '1.7px', fontWeight: '700' }],
        h6: ['18px', { lineHeight: '24px', letterSpacing: '1.3px', fontWeight: '700' }],
        body: ['15px', { lineHeight: '25px', fontWeight: '500' }],
        overline: ['14px', { lineHeight: '19px', letterSpacing: '10px', fontWeight: '400' }],
        subtitle: ['13px', { lineHeight: '25px', letterSpacing: '1px', fontWeight: '700' }],
      },
      // Spacing (can be extended as needed)
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      // Border Radius
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};
