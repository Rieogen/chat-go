import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://backend:3000", // 代理先のサーバー
        changeOrigin: true, // オリジンを変更する
        rewrite: (path) => path.replace(/^\/api/, ''), // プレフィックスを削除
      }
    },
    watch: {
      usePolling: true
    },
  },
})