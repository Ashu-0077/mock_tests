import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mock_tests/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});