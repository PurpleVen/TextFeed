import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';



export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': "http://textfeed.onrender.com/", // Proxy /api requests to backend
    },
  },
});
