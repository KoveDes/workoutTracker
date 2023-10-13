import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    // port: 5173, //dev server on 5173
    proxy: {
      "/api": {
        target: 'http://localhost:3500',
        changeOrigin: true,
        rewrite: path => path.replace('/api', ''),
        cookiePathRewrite: {
          '*': '/'
        }
      }
    }
  }
})
