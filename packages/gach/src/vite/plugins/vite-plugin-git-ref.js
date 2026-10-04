import child_process from 'node:child_process';

/**
 * @import { Plugin } from 'vite';
 */

/**
 * @typedef GitRefOptions
 * @property {string} [fallback]
 */

/**
 * @param {GitRefOptions} [options]
 * @returns {Plugin}
 */
export function gitRef(options = {}) {
	const o = { fallback: 'main', ...options };

	return {
		name: 'vite-plugin-gach:git-ref',
		config() {
			return {
				define: {
					'import.meta.env.GIT_REF': JSON.stringify(getCurrentBranch(o.fallback)),
				},
			};
		},
	};
}

/**
 * @param {string} fallback
 * @returns {string}
 */
function getCurrentBranch(fallback) {
	try {
		// Falls back to CI environment variables if available (e.g., GitHub Actions, GitLab CI)
		return (
			process.env.GITHUB_REF_NAME ||
			process.env.CI_COMMIT_REF_NAME ||
			child_process.execSync('git branch --show-current').toString().trim() ||
			child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
		);
	} catch {
		return fallback;
	}
}
