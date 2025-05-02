import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  root: '.', 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, 
        credentials: 'include', 
        secure: false,
      },
    },
  },
});