import type { ContainerBuilder } from '@discordjs/builders';
export declare class WebhookClient {
    readonly webhookId: string;
    readonly webhookToken: string;
    constructor(webhookId: string, webhookToken: string);
    private _createRequestUrl;
    execute(containerBuilder: ContainerBuilder): Promise<void>;
}
