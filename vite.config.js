import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import remarkGfm from 'remark-gfm'

const rawMdxPrefix = '\0fairlea-raw-mdx:'

function rawMdxSearchText() {
  return {
    name: 'fairlea-raw-mdx-search-text',
    enforce: 'pre',
    async resolveId(source, importer) {
      const queryIndex = source.indexOf('?')

      if (queryIndex === -1 || !source.slice(0, queryIndex).endsWith('.mdx')) {
        return null
      }

      const query = new URLSearchParams(source.slice(queryIndex + 1))

      if (!query.has('raw')) {
        return null
      }

      const resolved = await this.resolve(
        source.slice(0, queryIndex),
        importer,
        {
          skipSelf: true,
        },
      )

      return resolved ? `${rawMdxPrefix}${resolved.id}` : null
    },
    async load(id) {
      if (!id.startsWith(rawMdxPrefix)) {
        return null
      }

      const source = await readFile(id.slice(rawMdxPrefix.length), 'utf8')
      return `export default ${JSON.stringify(source)}`
    },
  }
}

export default defineConfig({
  plugins: [
    rawMdxSearchText(),
    mdx({ exclude: /\?raw$/, remarkPlugins: [remarkGfm] }),
    reactRouter(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
