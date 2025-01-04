import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cela permet d'accéder via l'IP
    open: true,// ouvre le navigateur par défaut automatiquement
  }
})
