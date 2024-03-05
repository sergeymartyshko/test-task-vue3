import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe';
// @ts-ignore
const pathSrc = resolve(__dirname, "./src");
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {

        additionalData: `@import "@/assets/scss/app.scss";`,
      },
    },
  },
  build: {
    sourcemap: true
  },
  mode: 'development'
})
