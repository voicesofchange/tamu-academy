import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { buildSitemapXml } from './src/lib/public-sitemap.js'

/**
 * Regenerates the sitemap from the app's own course and article data on every
 * build, so publishing a course or an article adds it without anyone editing
 * the XML by hand. Written to public/ (served in preview) and dist/ (the
 * deployed copy).
 */
function tamuSitemap() {
  const write = (target) => {
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, buildSitemapXml(), 'utf8')
  }

  return {
    name: 'tamu-sitemap',
    apply: 'build',
    buildStart() {
      write(resolve('public/sitemap.xml'))
    },
    closeBundle() {
      write(resolve('dist/sitemap.xml'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
    tamuSitemap(),
  ]
});