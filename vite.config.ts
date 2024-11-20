import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/RIP-Frontend",
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://192.168.0.19:8001",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});