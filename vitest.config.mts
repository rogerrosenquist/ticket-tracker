import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Simulates a browser environment for React components
    environment: 'jsdom',
    // Parses CSS modules (like Tailwind utility classes) to prevent test errors
    css: true, 
    alias: {
      // Maps the '@' import alias to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});