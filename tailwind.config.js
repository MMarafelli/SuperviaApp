/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffcc29',
          hover: '#e6b824',
          light: '#fff3cc',
          dark: '#cc9f20',
        },
        success: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: '#d1fae5',
          dark: '#047857',
        },
        error: {
          DEFAULT: '#ef4444',
          hover: '#dc2626',
          light: '#fecaca',
          dark: '#b91c1c',
        },
        warning: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
          light: '#fef3c7',
          dark: '#92400e',
        },
        info: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          light: '#dbeafe',
          dark: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'sv-sm': '0.375rem',
        'sv-md': '0.5rem',
        'sv-lg': '0.75rem',
      },
      boxShadow: {
        'sv-sm': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'sv-md': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'sv-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'sv-xl': '0 16px 48px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}