import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['frontend/src/main.tsx'],
      refresh: ['resources/views/**/*.blade.php', 'frontend/src/**/*.{css,js,jsx,ts,tsx}'],
    }),
    react(),
  ],
});
