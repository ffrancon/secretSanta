import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2023,
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('.', './src'),
      '@components': path.resolve('.', './src/components'),
      '@utils': path.resolve('.', './src/utils'),
      '@redux': path.resolve('.', './src/redux'),
      '@icons': path.resolve('.', './src/icons'),
    },
  },
});
