/* biome-ignore-all lint/style/useNamingConvention: (x) */

import {
	ContainerBuilder,
	HeadingLevel,
	heading,
	hyperlink,
	TextDisplayBuilder,
} from '@discordjs/builders';
import { IssuesClosedEvent } from '@octokit/webhooks-types';

import { PURPLE_COLOR } from '#/lib/Colors.js';
import { ISSUE_CLOSED_EMOJI } from '#/lib/Emojis.js';

export function ISSUE_CLOSED_MESSAGE({ issue, repository }: IssuesClosedEvent): ContainerBuilder {
	const { number: issueNumber, title: issueTitle, url: issueUrl } = issue;
	const { full_name: repositoryFullName } = repository;

	const containerBuilder = new ContainerBuilder();
	const containerTitleBuilder = new TextDisplayBuilder();

	containerTitleBuilder.setContent(
		heading(
			hyperlink(
				`${ISSUE_CLOSED_EMOJI} [${repositoryFullName}] (Issue #${issueNumber}) ${issueTitle}`,
				issueUrl,
			),
			HeadingLevel.Three,
		),
	);

	containerBuilder.addTextDisplayComponents(containerTitleBuilder);
	containerBuilder.setAccentColor(PURPLE_COLOR);

	return containerBuilder;
}
