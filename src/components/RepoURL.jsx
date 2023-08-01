import React, { useState } from "react";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_PAT });

export default function RepoURL({ setIssues }) {
	const [repoUrl, setRepoUrl] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const getRepoIssues = async (page) => {
		// Receive the page as an argument
		const urlElements = repoUrl.split("/");
		const owner = urlElements[urlElements.length - 2];
		const repo = urlElements[urlElements.length - 1];
		try {
			const { data } = await octokit.rest.issues.listForRepo({
				owner,
				repo,
				page: page,
				per_page: 10,
			});
			setIssues(data);
		} catch (error) {
			console.error("Failed to fetch issues", error);
		}
	};

	const handleNextPageClick = () => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage);
		getRepoIssues(nextPage);
	};

	const handlePrevPageClick = () => {
		const prevPage = currentPage - 1;
		setCurrentPage(prevPage);
		getRepoIssues(prevPage);
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

			{currentPage === 1 && ( // Only show the 'Fetch Issues' button if the current page is 1
				<button
					type="button"
					onClick={() => {
						getRepoIssues(currentPage);
						const nextPage = currentPage + 1;
						setCurrentPage(nextPage);
					}}
				>
					Get Issues
				</button>
			)}

			{currentPage > 2 && ( // Only show the 'Previous Page' button if the current page is greater than 1
				<button type="button" onClick={handlePrevPageClick}>
					Previous Page
				</button>
			)}

			{currentPage >= 2 && ( // Only show the 'Next Page' button if issues have been fetched at least once
				<div>
					<button type="button" onClick={handleNextPageClick}>
						Next Page
					</button>
					<p>Page: {currentPage - 1}</p>
				</div>
			)}
		</div>
	);
}
