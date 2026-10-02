import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  plugins: [mdx({ remarkPlugins: [remarkGfm] }), reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
