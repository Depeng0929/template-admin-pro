import VueRouter from 'unplugin-vue-router/vite'

export default [
  // file base
  VueRouter({
    exclude: ['pages/**/components/*.vue', 'pages/**/*.ts'],
  }),
]
