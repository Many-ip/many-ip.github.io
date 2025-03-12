import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // 🔥 Permite acceso desde la red local
    port: 5173, // Cambia el puerto si es necesario
  }
})
