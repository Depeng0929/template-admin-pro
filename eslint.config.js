import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    'unicorn/prefer-regex-literals': 'off',
  },
)
