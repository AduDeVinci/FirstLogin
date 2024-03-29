import antfu from '@antfu/eslint-config'

export default antfu({

}, {
    rules: {
        'vue/max-attributes-per-line': ['error', {
            singleLine: {
                max: 1,
            },
            multiLine: {
                max:1,
            },
        }],
        'curly': ['error', 'all'],
    },
})
