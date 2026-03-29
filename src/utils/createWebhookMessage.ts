import type { ContainerBuilder } from '@discordjs/builders';
import type {
	PullRequestEvent,
	PullRequestOpenedEvent,
	PushEvent,
	StarCreatedEvent,
	StarEvent,
	WebhookEvent,
} from '@octokit/webhooks-types';
import { match, P } from 'ts-pattern';
import { PushEventHandler } from '#/events/Push.js';
import { PullRequestOpenedEventHandler } from '#/events/pull_request/PullRequestOpened.js';
import { StarCreatedEventHandler } from '#/events/star/StarCreated.js';

export function createWebhookMessage(
	webhookEventName: string,
	webhookEvent: WebhookEvent,
): ContainerBuilder | null {
	return match(webhookEventName)
		.returnType<ContainerBuilder | null>()
		.with('pull_request', () => {
			const { action } = webhookEvent as PullRequestEvent;

			return match(action)
				.returnType<ContainerBuilder | null>()
				.with('opened', () =>
					PullRequestOpenedEventHandler.createEventContainerBuilder(
						webhookEvent as PullRequestOpenedEvent,
					),
				)
				.with(P._, () => null)
				.run();
		})
		.with('push', () => PushEventHandler.createEventContainerBuilder(webhookEvent as PushEvent))
		.with('star', () => {
			const { action } = webhookEvent as StarEvent;

			return match(action)
				.returnType<ContainerBuilder | null>()
				.with('created', () =>
					StarCreatedEventHandler.createEventContainerBuilder(
						webhookEvent as StarCreatedEvent,
					),
				)
				.with(P._, () => null)
				.run();
		})
		.with(P._, () => null)
		.run();
}
