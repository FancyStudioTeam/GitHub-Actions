import { escapeInlineCode, hyperlink, inlineCode } from '@discordjs/formatters';

export function formatRepositoryHyperlink(repositoryFullName: string, repositoryUrl: string) {
	return hyperlink(inlineCode(escapeInlineCode(repositoryFullName)), repositoryUrl);
}
