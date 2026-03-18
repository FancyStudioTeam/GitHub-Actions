"use strict";
// @ts-check
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookClient = void 0;
const v10_1 = require("discord-api-types/v10");
class WebhookClient {
    constructor(webhookId, webhookToken) {
        this.webhookId = webhookId;
        this.webhookToken = webhookToken;
    }
    _createRequestUrl() {
        const { webhookId, webhookToken } = this;
        const url = new URL(`https://discord.com/api/v10/webhooks/${webhookId}/${webhookToken}`);
        const { searchParams } = url;
        searchParams.set('with_components', 'true');
        return url;
    }
    async execute(message) {
        const url = this._createRequestUrl();
        await fetch(url, {
            body: JSON.stringify({
                components: [
                    message,
                ],
                flags: v10_1.MessageFlags.IsComponentsV2,
            }),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        });
    }
}
exports.WebhookClient = WebhookClient;
