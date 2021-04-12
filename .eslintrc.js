module.exports = {
    env: {
        node: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
        // 'plugin:jsdoc/recommended' //FIXME: Too many errors to fix right now, but should be handled!
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: {
        // Bad Practices
        '@typescript-eslint/camelcase': 'off', // TODO: Maybe turn this on in the future?
        '@typescript-eslint/no-explicit-any': 'off',
        'curly': 'error',
        'no-await-in-loop': 'error',
        'no-eval': 'error',
        'no-implicit-globals': 'error',
        'no-lone-blocks': 'error',
        'no-return-await': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-with': 'error',
        'prefer-arrow-callback': [ 'error', { allowNamedFunctions: true } ],
        'prefer-promise-reject-errors': 'error',
        'prefer-rest-params': 'warn',
        'no-label-var': 'error',
        'no-undefined': 'off',
        'no-use-before-define': 'error',
        'no-array-constructor': 'error',
        'no-new-object': 'error',
        'no-continue': 'error',
        'no-unneeded-ternary': 'error',
        'complexity': [ 'error', 70 ],
        'require-atomic-updates': 'off',

        // Common Mistakes
        '@typescript-eslint/no-unused-vars': [ 'warn', { ignoreRestSiblings: true, argsIgnorePattern: '^_' } ],
        'no-extra-bind': 'warn',
        'no-floating-decimal': 'warn',
        'no-multi-spaces': 'warn',
        'no-useless-call': 'warn',
        'no-useless-return': 'warn',
        'require-await': 'off',
        'no-mixed-operators': 'warn',
        'no-shadow': 'off',

        // Style
        '@typescript-eslint/type-annotation-spacing': [ 'warn', { before: true, after: true } ],
        '@typescript-eslint/explicit-function-return-type': [ 'warn', { allowExpressions: true } ],
        'array-bracket-newline': [ 'warn', 'consistent' ],
        'array-bracket-spacing': [ 'warn', 'always' ],
        'array-element-newline': [ 'warn', 'consistent' ],
        'arrow-parens': [ 'warn', 'always' ],
        'arrow-spacing': 'warn',
        'block-spacing': 'warn',
        'brace-style': [ 'warn', 'allman', { allowSingleLine: true } ],
        'camelcase': 'off',
        'comma-dangle': [ 'warn', 'never' ],
        'comma-spacing': [ 'warn', { before: false, after: true } ],
        'comma-style': [ 'warn', 'last' ],
        'computed-property-spacing': [ 'warn', 'never' ],
        'consistent-this': [ 'warn', 'self' ],
        'eol-last': [ 'warn', 'always' ],
        'func-call-spacing': [ 'warn', 'never' ],
        'func-style': [ 'warn', 'declaration', { allowArrowFunctions: true } ],
        'function-paren-newline': [ 'warn', 'multiline' ],
        'generator-star-spacing': [ 'warn', { before: true, after: false } ],
        'id-length': [ 'warn', { min: 2, exceptions: [ '$', '_', 'i', 'x', 'y', 'z' ] } ],
        'indent': [
            'warn',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                MemberExpression: 1,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1
                },
                CallExpression: {
                    arguments: 1
                },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false
            }
        ],
        'key-spacing': [ 'warn', { beforeColon: false, afterColon: true } ],
        'keyword-spacing': [
            'warn',
            {
                overrides: {
                    if: { after: false },
                    for: { after: false },
                    while: { after: false }
                }
            }
        ],
        'lines-between-class-members': [ 'warn', 'always', { exceptAfterSingleLine: true } ],
        'new-parens': 'warn',
        'newline-per-chained-call': [ 'warn', { ignoreChainWithDepth: 2 } ],
        'no-confusing-arrow': [ 'warn', { allowParens: false } ],
        'no-duplicate-imports': 'warn',
        'no-lonely-if': 'warn',
        'no-multi-assign': 'warn',
        'no-multiple-empty-lines': [ 'warn', { max: 1, maxBOF: 0, maxEOF: 1 } ],
        'no-useless-computed-key': 'warn',
        'no-useless-rename': [
            'error',
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false
            }
        ],
        'no-var': 'warn',
        'no-whitespace-before-property': 'warn',
        'object-curly-spacing': [ 'warn', 'always' ],
        'object-property-newline': [ 'warn', { allowAllPropertiesOnSameLine: true } ],
        'object-shorthand': [ 'warn', 'always' ],
        'one-var': [ 'warn', 'never' ],
        'operator-linebreak': [ 'warn', 'before' ],
        'padded-blocks': [ 'warn', 'never' ],
        'prefer-const': 'warn',
        'prefer-object-spread': 'warn',
        'prefer-template': 'warn',
        'quote-props': [ 'warn', 'consistent-as-needed' ],
        'quotes': [ 'warn', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
        'semi': [ 'error', 'always' ],
        'semi-spacing': [ 'warn', { before: false, after: true } ],
        'space-before-blocks': 'warn',
        'space-before-function-paren': [ 'warn', 'never' ],
        'space-in-parens': [ 'warn', 'never' ],
        'space-infix-ops': 'warn',
        'space-unary-ops': 'warn',
        'spaced-comment': [
            'warn',
            'always',
            {
                line: {
                    markers: [ '/' ],
                    exceptions: [ '-', '+' ]
                },
                block: {
                    markers: [ '!' ],
                    exceptions: [ '*' ],
                    balanced: true
                }
            }
        ],
        'switch-colon-spacing': 'warn',
        'template-curly-spacing': [ 'warn', 'always' ],
        'template-tag-spacing': 'warn',
        'yield-star-spacing': [ 'warn', 'before' ],
        'yoda': [ 'warn', 'never', { exceptRange: true } ]
    },
    overrides: [
        {
            files: [ '*.ts', '*.tsx' ],
            rules: {
                'no-dupe-class-members': 'off',
                'jsdoc/require-param-type': 'off',
                'jsdoc/require-returns-type': 'off'
            }
        },
        {
            files: [ '*.js', '*.jsx', '*.vue' ],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off'
            }
        }
    ]
};
