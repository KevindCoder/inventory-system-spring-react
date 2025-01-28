import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  plugins: [react(), viteCompression({ algorithm: 'brotliCompress' })],
})
