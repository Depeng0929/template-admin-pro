import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    files: ['**/*.ts'],
    rules: {
      'prefer-regex-literals': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'antfu/top-level-function': 'off',
    },
  },
)
