import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    css: true,
    // needed for @testing-library/react cleanup
    setupFiles: ['./vitest.setup.ts'], 
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});