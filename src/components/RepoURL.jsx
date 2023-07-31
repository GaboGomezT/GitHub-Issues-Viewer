import React, { useState } from "react";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_PAT });

export default function RepoURL({ setIssues, issues }) {
	const [repoUrl, setRepoUrl] = useState("");

	const getRepoIssues = async () => {
		const urlElements = repoUrl.split("/");
		const owner = urlElements[urlElements.length - 2];
		const repo = urlElements[urlElements.length - 1];
		try {
			const { data } = await octokit.rest.issues.listForRepo({
				owner,
				repo,
			});
			setIssues(data);
		} catch (error) {
			console.error("Failed to fetch issues", error);
		}
	};

	return (
		<div>
			<input
				type="text"
				id="repoUrl"
				name="repoUrl"
				placeholder="Enter Github repo URL"
				value={repoUrl}
				onChange={(e) => setRepoUrl(e.target.value)}
				required
			/>

			<button type="button" onClick={getRepoIssues}>
				Get Issues
			</button>
		</div>
	);
}
