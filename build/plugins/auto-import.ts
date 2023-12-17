import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { vitePluginForArco } from '@arco-plugins/vite-vue'

export default [
  // https://github.com/antfu/unplugin-auto-import
  AutoImport({
    imports: [
      'vue',
      VueRouterAutoImports,
      {
        // add any other imports you were relying on
        'vue-router/auto': ['useLink'],
      },
      {
        '@depeng9527/tools': [
          'debug',
          'equal',
        ],
      },
    ],
    dts: true,
    dirs: [
      './src/composables',
    ],
    vueTemplate: true,
    resolvers: [ArcoResolver()],
  }),

  // https://github.com/antfu/vite-plugin-components
  Components({
    dts: true,
    resolvers: [
      ArcoResolver({
        sideEffect: true,
      }),
    ],
  }),

  vitePluginForArco({
    style: 'css',
  }),
]
