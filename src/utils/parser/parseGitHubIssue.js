/// <reference path="../../types/GitHub.js" />
// @ts-check

/**
 * @param {Record<string, any>} payload
 * @returns {GitHubIssue}
 */
export function parseGitHubIssue(payload) {
	const { issue } = payload;
	const { body, html_url: url, title } = issue;

	/** @type {GitHubIssue} */
	const gitHubIssue = {
		body: body || null,
		title,
		url,
	};

	return gitHubIssue;
}
