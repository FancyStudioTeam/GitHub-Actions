import {
	ContainerBuilder,
	escapeMarkdown,
	HeadingLevel,
	heading,
	hyperlink,
	TextDisplayBuilder,
} from '@discordjs/builders';
import type { IssuesClosedEvent } from '@octokit/webhooks-types';
import { PURPLE_COLOR } from '#/lib/Colors.js';
import { ISSUE_CLOSED_EMOJI } from '#/lib/Emojis.js';

export const IssueClosedEventHandler = Object.freeze({
	createContainerBuilder(): ContainerBuilder {
		return new ContainerBuilder();
	},

	createTitleBuilder(issueClosedEvent: IssuesClosedEvent): TextDisplayBuilder {
		const titleString = this.formatContainerTitle(issueClosedEvent);
		const titleBuilder = new TextDisplayBuilder();

		titleBuilder.setContent(titleString);

		return titleBuilder;
	},

	formatContainerTitle({ issue, repository, sender }: IssuesClosedEvent): string {
		const { html_url: issueHtmlUrl, number: issueNumber } = issue;
		const { name: repositoryName } = repository;
		const { login: senderLogin } = sender;

		const formattedTitle = escapeMarkdown(
			`${ISSUE_CLOSED_EMOJI} [${repositoryName}] ${senderLogin} has Closed Issue #${issueNumber}`,
		);

		return heading(hyperlink(formattedTitle, issueHtmlUrl), HeadingLevel.Three);
	},

	handle(issueClosedEvent: IssuesClosedEvent): ContainerBuilder {
		const containerBuilder = this.createContainerBuilder();
		const containerTitleBuilder = this.createTitleBuilder(issueClosedEvent);

		containerBuilder.setAccentColor(PURPLE_COLOR);
		containerBuilder.addTextDisplayComponents(containerTitleBuilder);

		return containerBuilder;
	},
});
