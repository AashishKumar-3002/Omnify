/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f4c427',
          light: '#ffd84d',
          dark: '#c99700',
        },
        background: {
          dark: '#121212',
          medium: '#1e1e1e',
          light: '#2a2a2a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3',
          tertiary: '#7a7a7a',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
        divider: '#333333',
        icon: {
          DEFAULT: '#b3b3b3',
          active: '#f4c427',
        },
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
        'sans-medium': ['System-Medium', 'sans-serif-medium'],
        'sans-bold': ['System-Bold', 'sans-serif-bold'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      lineHeight: {
        'xs': '16px',
        'sm': '20px',
        'base': '24px',
        'lg': '28px',
        'xl': '30px',
        '2xl': '32px',
        '3xl': '38px',
        '4xl': '44px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};