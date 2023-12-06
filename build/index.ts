import process from 'node:process'
import type { UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import vuePlugins from './plugins/vue'
import autoImport from './plugins/auto-import'
import configCompressPlugin from './plugins/compress'
import configVisualizerPlugin from './plugins/visualizer'
import unplugins from './plugins/unplugin'
import htmlPlugins from './plugins/html'

import comlinkConfig from './comlink'

const config: UserConfig = {
  plugins: [
    ...vuePlugins,
    ...autoImport,
    ...unplugins,
    ...htmlPlugins,

    process.env.NODE_ENV === 'production'
      ? [
          configCompressPlugin('gzip'),
          configVisualizerPlugin(),
        ]
      : [],
  ],
}

export default mergeConfig(config, comlinkConfig)
