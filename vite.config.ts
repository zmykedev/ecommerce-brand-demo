import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor'
            }
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'form-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('@tanstack')) {
              return 'query-vendor'
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor'
            }
            // Other node_modules
            return 'vendor'
          }
          // Feature chunks
          if (id.includes('/pages/admin/')) {
            return 'admin'
          }
          if (id.includes('/pages/client/')) {
            return 'client'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})

