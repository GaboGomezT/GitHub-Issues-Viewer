import "./App.css";
import { useState } from "react";
import RepoURL from "./components/RepoURL";
import Issue from "./components/Issue";

function App() {
	const [issues, setIssues] = useState([]);
	return (
		<div>
			<RepoURL setIssues={setIssues} issues={issues} />
			{issues.map((issue) => (
				<Issue key={issue.id} issue={issue} />
			))}
		</div>
	);
}

export default App;
