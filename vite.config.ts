import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import { writeFileSync, copyFileSync } from 'fs';
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
  publicDir: 'public',
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
    {
      name: 'copy-web-config',
      writeBundle() {
        // Copia web.config para dist após build
        copyFileSync(
          resolve(__dirname, 'web.config'),
          resolve(__dirname, 'dist/web.config')
        );
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      },
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
        'assets/icons/sv_192x192.png'
      ],
      useCredentials: true,
      devOptions: {
        enabled: true
      }
    })
  ],
})
