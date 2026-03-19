import type { GitHubIssue, GitHubRepository } from '#/types/GitHub.js';

export interface IssueMessageOptions {
	issue: GitHubIssue;
	repository: GitHubRepository;
}
