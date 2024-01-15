module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'react', '@typescript-eslint', 'react-hooks'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'import/extensions': [
            'error',
            'ignorePackages',
            { ts: 'never', tsx: 'never' },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            { allowExpressions: true },
        ],
        'max-len': [
            'warn',
            { code: 100, ignoreComments: true, ignoreUrls: true },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'import/prefer-default-export': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
}
