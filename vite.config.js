import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 5020,
    proxy: {
      '/jh': {
        // target: 'http://8.138.129.122:9090',
        target: 'http://localhost:9090',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jh/, '')
      },
    },
  },
})
