import { defineConfig } from 'oxlint';

export default defineConfig({
	ignorePatterns: ['**/dist'],
	options: {
		typeAware: true,
		typeCheck: true,
	},
	rules: {
		eqeqeq: 'error',
		'no-commonjs': 'error',
		'no-empty': 'error',
		'no-implicit-coercion': 'error',
		'no-nodejs-modules': 'off',
		'no-static-only-class': 'warn',
		'prefer-node-protocol': 'error',
		'prefer-nullish-coalescing': 'error',
		'sort-keys': 'warn',
		'unified-signatures': 'error',
	},
});
