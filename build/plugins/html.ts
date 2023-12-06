import type { Plugin } from 'vite'
import config from '../../config'

function createHtmlTitlePlugins(): Plugin {
  return {
    name: 'vite-plugins-html-title',
    transformIndexHtml(html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>${config.appName}</title>`,
      )
    },
  }
}

export default [
  createHtmlTitlePlugins(),
]
