import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './public',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/posts.json': 'http://localhost:3000',
      '/blogs.json': 'http://localhost:3000',
      '/topics.json': 'http://localhost:3000',
      '/createUser': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/feed': 'http://localhost:3000',
      '/api/settings/profile': 'http://localhost:3000',
    },
  },
});
