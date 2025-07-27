import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Gera versão baseada no timestamp
const buildTime = new Date().toISOString();
const version = Date.now().toString();

// https://vitejs.dev/config/
export default defineConfig({
  base: '/SuperviaApp/',
  define: {
    '__APP_VERSION__': JSON.stringify(version),
    '__BUILD_TIME__': JSON.stringify(buildTime)
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    {
      name: 'generate-version',
      buildStart() {
        // Gera arquivo version.json no diretório public
        const versionInfo = {
          version,
          buildTime,
          timestamp: Date.now()
        };
        
        writeFileSync(
          resolve(__dirname, 'public/version.json'),
          JSON.stringify(versionInfo, null, 2)
        );
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
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
