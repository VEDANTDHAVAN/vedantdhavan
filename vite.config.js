import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/vedantdhavanresume/', // ✅ This line is critical for GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
