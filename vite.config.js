import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

const analyzeBundle = process.env.ANALYZE === 'true';

export default defineConfig({
  //base: '/vedantdhavanresume/', // ✅ This line is critical for GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
    analyzeBundle &&
      visualizer({
        open: false,
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
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
