import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,          // Automatically open the report
      filename: 'stats.html', // Output file
      gzipSize: true,      // Show gzip sizes
      brotliSize: true,    // Show brotli sizes
    }),
  ],
})