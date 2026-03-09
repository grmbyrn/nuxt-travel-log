// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    type: "app",
    vue: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double"
    }
  }, {
    rules: {
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antifu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": ["error", {
        internalPattern: '^@/',
      }],
      "unicorn/filename-case": ["error", {
        case: "kebabCase",
        ignore: ["READEME.md"]
      }]
    }
  })
)
