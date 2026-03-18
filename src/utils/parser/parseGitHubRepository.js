/// <reference path="../../types/GitHub.js" />
// @ts-check

/**
 * @param {Record<string, any>} payload
 * @returns {GitHubRepository}
 */
export function parseGitHubRepository(payload) {
	const { repository } = payload;
	const { full_name: fullName, html_url: url, name } = repository;

	/** @type {GitHubRepository} */
	const gitHubRepository = {
		fullName,
		name,
		url,
	};

	return gitHubRepository;
}
