import VueRouter from 'unplugin-vue-router/vite'

export default [
  // file base
  VueRouter({
    exclude: ['**/components/*.vue', 'pages/**/*.ts'],
  }),
]
