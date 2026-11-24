import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// BASE_PATH é definido no workflow de deploy para o GitHub Pages
// (o site é servido em /restaurante_website/). Localmente fica '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
