import type { UserConfig } from 'vite'

import { comlink } from 'vite-plugin-comlink'

const config: UserConfig = {
  plugins: [
    comlink(),
  ],
  worker: {
    plugins: [
      comlink(),
    ] as any,
  },
}

export default config
