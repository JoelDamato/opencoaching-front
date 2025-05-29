import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 👈 necesitás esto para path.resolve

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 esto crea el alias @
    },
  },
});
