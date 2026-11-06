import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

const analyzeBundle = process.env.ANALYZE === 'true';

export default defineConfig({
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
  // Disable automatic module preloading of every chunk. Vite's default
  // `<link rel="modulepreload">` would eagerly pull in the 1.1 MB three.js chunk
  // even though the 3D scene is lazy-loaded behind a button. That single preload
  // is what was blocking the first paint for over a minute.
  build: {
    // Disable automatic module preloading of every chunk. Vite's default
    // `<link rel="modulepreload">` would eagerly pull in the 1.1 MB three.js chunk
    // even though the 3D scene is lazy-loaded behind a button. That single preload
    // is what was blocking the first paint for over a minute.
    modulePreload: false,
    rollupOptions: {
      output: {
        // Let Vite split naturally by import() boundaries. The previous manualChunks
        // entry forced three.js into a shared vendor chunk that was preloaded by the
        // root module, so the browser waited for 1.1 MB before rendering anything.
        manualChunks: undefined,
      },
    },
    chunkSizeWarningLimit: 1000,
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
});