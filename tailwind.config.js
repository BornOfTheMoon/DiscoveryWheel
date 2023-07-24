const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue'
  ],
  theme: {
    screens: {
      sm: {
        min: '641px'
      },
      md: {
        min: '769px'
      },
      lg: {
        min: '1025px'
      },
      xl: {
        min: '1281px'
      },
      '2xl': {
        min: '1537px'
      }
    },
    fontFamily: {
      sans: ['nunito', ...defaultTheme.fontFamily.sans],
      serif: ['nunito', ...defaultTheme.fontFamily.serif],
      mono: ['nunito', ...defaultTheme.fontFamily.mono]
    },
    extend: {
      padding: {
        full: '100%'
      },
      margin: {
        '1/20': '5%',
        '1/24': '4.16%'
      },
      width: {
        128: '32rem'
      },
      minHeight: {
        main: '70vh',
        navbar: '5vh'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')

  ]
}
