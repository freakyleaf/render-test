module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:vue/recommended',
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'array-bracket-spacing': [
            'error',
            'always',
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'never',
                'exports': 'never',
                'functions': 'never',
            },
        ],
        'indent': [
            'error',
            4,
        ],
        'keyword-spacing': [
            'error',
            {
                'after': true,
                'before': true,
            },
        ],
        'linebreak-style': [
            'error',
            'windows',
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'space-before-function-paren': [
            'error',
            'always',
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        'vue/html-indent': [
            'error',
            4,
        ],
        'vue/no-v-html': [
            'error',
        ],
    },
};
