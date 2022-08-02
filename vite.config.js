import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm.js',
      'vue-slider-component': 'vue-slider-component/dist/vue-slider-component.umd.js',
    },
  },
  build: {
    brotliSize: false, // unsupported in StackBlitz
    minify: false,
  },
})
