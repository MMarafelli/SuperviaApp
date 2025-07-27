import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/SuperviaApp/',
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: [
        'assets/icons/favicon.png',
        'assets/icons/apple-touch-icon.png',
        'assets/icons/icon_192.png',
        'assets/icons/icon_512.png',
      ],
      manifest: {
        name: 'Supervia App',
        short_name: 'Supervia',
        description: 'Aplicativo para cálculos de pintura e sinalização viária.',
        theme_color: '#282c34',
        background_color: '#282c34',
        display: 'standalone',
        scope: '/SuperviaApp/',
        start_url: '/SuperviaApp/',
        orientation: 'portrait',
        icons: [
          {
            src: 'assets/icons/favicon.png',
            sizes: '52x52',
            type: 'image/png'
          },
          {
            src: 'assets/icons/apple-touch-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/icons/icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'assets/icons/icon_192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
