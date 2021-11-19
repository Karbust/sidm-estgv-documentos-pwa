import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { minifyHtml } from 'vite-plugin-html'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: 3000
    },
    publicDir: 'public',
    build: {
      outDir: 'build',
      terserOptions: { format: { comments: false } },
    },
    plugins: [
      reactRefresh(),
      minifyHtml(),
      VitePWA({
        srcDir: 'src',
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        filename: 'service-worker.ts',
        injectManifest: {
          swSrc: './src/serviceWorkerWorkbox.ts'
        },
        workbox: {
          cleanupOutdatedCaches: false,
        }
      })
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
  });
}
