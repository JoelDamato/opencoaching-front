/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Incluir todos los componentes en src
      './public/index.html', // Incluir tu HTML si también usas clases ahí
    ],// Asegúrate de que los archivos que contienen clases de Tailwind estén cubiertos
  theme: {
    extend: {
      // Aquí puedes extender el tema por defecto de Tailwind con tus propios estilos.
    },
  },
  plugins: [],
}
