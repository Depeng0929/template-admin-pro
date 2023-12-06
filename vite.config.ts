/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig, mergeConfig } from 'vite'
import buildConfig from './build/index'

export default mergeConfig(defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  optimizeDeps: {
    include: [
      '@arco-design/web-vue',
      'echarts',
      'vue-echarts',
    ],
  },

  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
}), buildConfig)
