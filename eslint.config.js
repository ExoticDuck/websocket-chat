import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-plugin-prettier/recommended'
import deMorgan from 'eslint-plugin-de-morgan'

export default ts.config(
  {
    ignores: [
      '.vscode/extensions.json',
      '.auth/',
      'dist/',
      'playwright-report/',
      'test-results/',
      'report-default/',
      'report-smoke/',
      'report-regression/',
      'package-lock.json',
      'cspell-words.js'
    ]
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: vueParser,
      parserOptions: {
        parser: ts.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue']
      }
    }
  },

  // js
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off'
    }
  },

  // ts
  ...ts.configs.recommended,
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ]
    }
  },

  // vue
  ...vue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': [
        'error',
        'never',
        {
          ignore: []
        }
      ],
      'vue/v-on-event-hyphenation': ['error', 'never'],
      'vue/no-v-html': 'off',

      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': [
        'error',
        { order: ['template', 'i18n', 'script[setup]', 'style[module]'] }
      ],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: true,
          ignores: []
        }
      ],
      'vue/custom-event-name-casing': 'error',
      'vue/define-emits-declaration': 'error',
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
          defineExposeLast: true
        }
      ],
      'vue/define-props-declaration': 'error',
      'vue/no-deprecated-props-default-this': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/valid-define-props': 'error',
      'vue/no-required-prop-with-default': 'error',
      'vue/html-button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: false
        }
      ],
      'vue/attributes-order': [
        2,
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ]
        }
      ],
      'vue/order-in-components': [
        2,
        {
          order: [
            'el',
            'name',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'data',
            'computed',
            'watch',
            'LIFECYCLE_HOOKS',
            'methods',
            ['template', 'render'],
            'renderError'
          ]
        }
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            normal: 'never',
            void: 'always',
            component: 'always'
          }
        }
      ],
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-root-v-if': 'off',
      'vue/no-template-target-blank': 'error',
      'vue/no-undef-components': [
        'error',
        {
          ignorePatterns: ['RouterView', 'PerfectScrollbar', 'RouterLink', 'i18n-t']
        }
      ],
      'vue/no-undef-properties': 'warn',
      'vue/no-unused-refs': 'warn',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/no-useless-mustaches': 'warn',
      'vue/no-useless-v-bind': 'warn',
      'vue/no-v-text': 'error',
      'vue/padding-line-between-blocks': 'warn',
      'vue/prefer-define-options': 'error',
      'vue/prefer-separate-static-class': 'warn',
      'vue/prefer-true-attribute-shorthand': 'warn',
      'vue/require-macro-variable-name': 'error',
      'vue/valid-define-options': 'error'
    }
  },

  // prettier
  prettier,
  {
    rules: {
      'prettier/prettier': 'warn'
    }
  },

  deMorgan.configs.recommended
)
