import React from "react";

export default function Issue({ issue }) {
	return (
		<div>
			<h2>{issue.title}</h2>
			<p>{issue.body}</p>
		</div>
	);
}
