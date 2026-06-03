import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Serve static directory index pages (e.g. /aiworkflowshub/) in dev so the
// dev server matches how static hosts resolve trailing-slash directories.
const staticIndexFallback = () => ({
  name: 'static-index-fallback',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url) {
        const [path, query] = req.url.split('?')
        if (path.endsWith('/') && path !== '/') {
          req.url = path + 'index.html' + (query ? '?' + query : '')
        }
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticIndexFallback()],
})
