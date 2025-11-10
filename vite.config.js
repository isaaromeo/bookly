import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // Opcional: aumenta el límite de warning
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
