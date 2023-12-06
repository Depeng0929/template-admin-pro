import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default [
  VueDevTools(),
  VueMacros({
    defineOptions: false,
    defineModels: false,
    plugins: {
      vue: Vue({
        script: {
          propsDestructure: true,
          defineModel: true,
        },
      }),
    },
  }),
  vueJsx(),
  UnoCSS(),

]
