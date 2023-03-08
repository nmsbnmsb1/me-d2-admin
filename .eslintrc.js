module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/standard'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': 'off',
		indent: 0,
		'comma-dangle': 'off',
		'space-before-function-paren': 0,
		'spaced-comment': 'off',
		semi: ['error', 'always'],
		'no-unused-vars': 'warn',
		'vue/no-use-v-if-with-v-for': 'off',
		camelcase: 'off',
		'vue/experimental-script-setup-vars': 'off',
		'vue/multi-word-component-names': 'off',
		'prefer-const': 'off',
		'n/no-callback-literal': 0,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
};
