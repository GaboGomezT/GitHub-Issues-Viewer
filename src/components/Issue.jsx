import React from "react";

function truncate(str, num) {
  if (str === null || str === undefined) {
    return "No Description";
  }

  if (str.length <= num) {
    return str;
  }

  return str.slice(0, num) + "...";
}


export default function Issue({ issue }) {
	return (
		<article className="issue-card">
			<header>
				<a href={issue.html_url} target="_blank" rel="noreferrer">
					{issue.title}
				</a>
			</header>
			<main>
				<p>{truncate(issue.body, 200)}</p>
				<p>
					Opened by:{" "}
					<a href={issue.user.html_url} target="_blank" rel="noreferrer">
						{issue.user.login}
					</a>
				</p>
				<p>State: {issue.state}</p>
				<p>Comments: {issue.comments}</p>
				<p>Created at: {new Date(issue.created_at).toLocaleString()}</p>
				<p>Last updated: {new Date(issue.updated_at).toLocaleString()}</p>
			</main>
			<footer>
				Assigned to:
				{issue.assignee ? (
					<a href={issue.assignee.html_url} target="_blank" rel="noreferrer">
						{issue.assignee.login}
					</a>
				) : (
					"No assignee"
				)}
			</footer>
		</article>
	);
}
