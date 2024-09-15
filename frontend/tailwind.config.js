/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
    extend: {
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '680px'},
        // => @media (max-width: 639px) { ... }
      }
    },
    colors:{
      'main' : '#e9f1fa',
      'txt main' : '#3e4560',
      'butons' : '#00abe4',
      'white' : '#ffffff',
      'headfoot':'#e0e7ff'
    },
    
  },
  plugins: [],
}
