import { visualizer } from 'rollup-plugin-visualizer'
import { build } from 'vite'

async function analyze() {
  await build({
    plugins: [
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  })
}

analyze()
