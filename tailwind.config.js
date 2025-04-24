/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d8dfeb',
          300: '#b8c4db',
          400: '#8f9fc5',
          500: '#6b7caf',
          600: '#556497',
          700: '#45507a',
          800: '#3b4465',
          900: '#343b54',
          950: '#23273a',
        },
        accent: {
          50: '#f6f5ff',
          100: '#edebfe',
          200: '#dcd7fe',
          300: '#c3b7fd',
          400: '#a68ffb',
          500: '#8b65f7',
          600: '#7d4aed',
          700: '#6c3bd4',
          800: '#5a32af',
          900: '#4c2d8d',
          950: '#2e1c55',
        },
        highlight: {
          50: '#f3f7f5',
          100: '#e3ebe7',
          200: '#c8d8d1',
          300: '#a3bdb2',
          400: '#799c8e',
          500: '#5c8273',
          600: '#48685c',
          700: '#3b544b',
          800: '#32453e',
          900: '#2b3a34',
          950: '#1a2421',
        },
        success: {
          50: '#f0fdf4',
          500: '#48685c',
          700: '#3b544b',
        },
        warning: {
          50: '#fffbeb',
          500: '#8b65f7',
          700: '#6c3bd4',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};