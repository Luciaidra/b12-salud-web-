/* Configuración de Tailwind (antes estaba en el <head> junto al CDN).
   Para regenerar styles.css después de usar clases nuevas, en esta carpeta:
     npx tailwindcss@3 -c tailwind.config.js -i tailwind.input.css -o styles.css --minify */
module.exports = {
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f6f1', 100: '#e6ebdf', 200: '#cdd7c0', 300: '#aebd9b', 400: '#8fa178',
          500: '#74875d', 600: '#5b6b48', 700: '#48553a', 800: '#3b4531', 900: '#2b3223'
        },
        brand: { olive: '#8f9677', dark: '#646b4f', light: '#f3f0e6' },
        cream: '#faf8f3',
        sand: '#efe9df',
        ink: '#2a2d26'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(43, 50, 35, 0.18)'
      }
    }
  }
};
