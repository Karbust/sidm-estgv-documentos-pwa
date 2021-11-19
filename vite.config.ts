import { defineConfig } from 'vite'
import { minifyHtml } from 'vite-plugin-html'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  publicDir: 'public',
  build: {
    outDir: 'build',
    terserOptions: { format: { comments: false } },
  },
  plugins: [
    reactRefresh(),
    minifyHtml()
  ],
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  resolve: {
    alias: [
      {
        find: /^@mui\/icons-material\/(.*)/,
        replacement: '@mui/icons-material/esm/$1',
      },
    ],
  },
})
