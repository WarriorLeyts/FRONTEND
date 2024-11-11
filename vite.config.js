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
      '/api/search': 'http://localhost:3000',
      // '/feed': 'http://localhost:3000',
      '/api/settings/profile': 'http://localhost:3000',
      '/api/settings/password': 'http://localhost:3000',
      '/api/settings/email': 'http://localhost:3000',
      '/posts/user/': 'http://localhost:3000',
      '/api/profile/': 'http://localhost:3000',
      '/api/subscriptions/is-following/': 'http://localhost:3000',
      '/api/subscriptions/toggle/': 'http://localhost:3000',
      '/posts/subscriptions': 'http://localhost:3000',
      '/api/profile/:id/followers': 'http://localhost:3000',
      '/api/profile/:id/following': 'http://localhost:3000',
      '/api/unlike/:post_id': 'http://localhost:3000',
      '/api/like/:post_id': 'http://localhost:3000',
    },
  },
});
