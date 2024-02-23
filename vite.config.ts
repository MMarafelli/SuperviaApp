import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

// you can copy the base structure of manifest object.
const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Super Via App",
    short_name: "Super Via App",
    description: "A Super Via App.",
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: "standalone",
    scope: "/SuperViaApp/",
    start_url: "/SuperViaApp/",
    orientation: 'portrait',
    icons: [
      {
        src: 'public/icons/favicon.png',
        sizes: '52x52',
        type: 'image/png',
        purpose: 'favicon'
      },
      {
        src: 'public/icons/apple-touch-icon.png',
        sizes: '52x52',
        type: 'image/png',
        purpose: 'apple touch icon',
      }
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/SuperViaApp/',
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
