import { defineConfig } from 'oxfmt';

export default defineConfig({
	arrowParens: 'always',
	bracketSameLine: false,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	ignorePatterns: ['**/dist'],
	jsxSingleQuote: true,
	printWidth: 100,
	semi: true,
	singleAttributePerLine: true,
	singleQuote: true,
	sortImports: {
		newlinesBetween: true,
		order: 'asc',
	},
	sortPackageJson: {
		sortScripts: true,
	},
	tabWidth: 4,
	useTabs: true,
});
