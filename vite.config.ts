import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig( ({ mode }) => {
  const isProduction = mode === 'production'

  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    },
    plugins: [react()],
    build: {
      lib: {
        entry: "./src/index.tsx",
        name: "workleap-components",
        formats: ["es"],
        fileName: (format) => `wl-components.${format}.js`,
      },
      target: "esnext",
    },
  }
})
