import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/ — set VITE_BASE=/alstar-web/ for that build.
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    cssCodeSplit: false,
  },
});
