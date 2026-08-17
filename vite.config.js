import { defineConfig } from 'vite'

export default defineConfig({
  base: '/persia2099/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        mint: 'mint.html'
      }
    }
  }
})
