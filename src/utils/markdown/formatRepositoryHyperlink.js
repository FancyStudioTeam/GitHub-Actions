// @ts-check

import { escapeInlineCode, hyperlink, inlineCode } from '@discordjs/formatters';

/**
 * @param {string} repositoryFullName
 * @param {string} repositoryUrl
 *
 * @returns {string}
 */
export function formatRepositoryHyperlink(repositoryFullName, repositoryUrl) {
	return hyperlink(inlineCode(escapeInlineCode(repositoryFullName)), repositoryUrl);
}
