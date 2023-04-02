import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            generateScopedName: '[hash:base64:8]'
        }
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[hash:16][extname]',
                chunkFileNames: 'assets/[hash:16].js',
                entryFileNames: 'assets/[hash:16].js'
            }
        }
    }
})
