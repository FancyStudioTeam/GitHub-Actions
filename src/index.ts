import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { ContainerBuilder } from '@discordjs/builders';
import { IssuesEvent } from '@octokit/webhooks-types';

import { ISSUE_CLOSED_MESSAGE } from './events/issues/IssueClosed.js';
import { ISSUE_OPENED_MESSAGE } from './events/issues/IssueOpened.js';
import { WebhookClient } from './structures/WebhookClient.js';

async function run(): Promise<void> {
	try {
		const webhookId = getInput('webhook_id');
		const webhookToken = getInput('webhook_token');

		const webhook = new WebhookClient(webhookId, webhookToken);

		const { eventName, payload } = context;

		switch (eventName) {
			case 'issues': {
				const { action } = payload as IssuesEvent;

				const messages: IssueEventMessagesMap = {
					closed: ISSUE_CLOSED_MESSAGE,
					opened: ISSUE_OPENED_MESSAGE,
				};
				const message = messages[action];

				if (message) {
					await webhook.execute(message(payload as never));
				}
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			setFailed(error);
		}
	}
}

void run();

type IssueEventMessagesMap = Partial<{
	[Event in IssuesEvent as Event['action']]: (options: Event) => ContainerBuilder;
}>;
