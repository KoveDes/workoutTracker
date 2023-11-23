import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // host: 'localhost',
    proxy: {
      "/api": {
        // target: 'http://localhost:3500',
        target: 'https://gymtrackr-api.onrender.com/', //deploy test
        changeOrigin: true,
        rewrite: path => path.replace('/api', ''),
        cookiePathRewrite: {
          '*': '/'
        }
      }
    }
  }
})
