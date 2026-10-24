import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

const analyzeBundle = process.env.ANALYZE === 'true';

export default defineConfig({
  //base: '/vedantdhavanresume/', // ✅ This line is critical for GitHub Pages
  // `host: true` is required here. Vite's resolveHostname() maps any literal host
  // string onto exactly ONE address family, so only one of these two URLs works:
  //   host: 'localhost'  -> ::1 only  -> http://127.0.0.1:5173/ is refused
  //   host: '127.0.0.1'  -> IPv4 only -> http://localhost:5173/  can time out
  // A refused connection renders the browser's "can't reach this page" interstitial,
  // which looks exactly like a blank portfolio with no console error.
  // `host: true` resolves to `undefined`, so Node binds the unspecified dual-stack
  // address and both http://127.0.0.1:5173/ and http://localhost:5173/ serve the app.
  server: {
    host: true,
  },
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
