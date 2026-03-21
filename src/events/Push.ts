import {
	ContainerBuilder,
	escapeMarkdown,
	heading,
	HeadingLevel,
	hyperlink,
	TextDisplayBuilder,
} from '@discordjs/builders';
import { PushEvent } from '@octokit/webhooks-types';

export class PushEventHandler {
	private static _createContainerTitleBuilder(pushEvent: PushEvent): TextDisplayBuilder {
		const containerTitleString = PushEventHandler._formatContainerTitle(pushEvent);
		const containerTitleBuilder = new TextDisplayBuilder().setContent(containerTitleString);

		return containerTitleBuilder;
	}

	private static _formatContainerTitle(pushEvent: PushEvent): string {
		const { commits, compare, ref, repository } = pushEvent;

		const { length: commitsLength } = commits;
		const { full_name: repositoryFullName } = repository;

		const title = escapeMarkdown(
			`[${repositoryFullName}] ${commitsLength} new Commit(s) at ${ref}`,
		);

		return heading(hyperlink(title, compare), HeadingLevel.Three);
	}

	public static handle(pushEvent: PushEvent): ContainerBuilder {
		const containerBuilder = new ContainerBuilder();
		const containerTitleBuilder = PushEventHandler._createContainerTitleBuilder(pushEvent);

		containerBuilder.addTextDisplayComponents(containerTitleBuilder);

		return containerBuilder;
	}
}
