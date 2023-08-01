import "./App.css";
import { useState } from "react";
import RepoURL from "./components/RepoURL";
import Issue from "./components/Issue";

function App() {
	const [issues, setIssues] = useState([]);
	return (
		<div>
			<RepoURL setIssues={setIssues} issues={issues} />
			<div className="issue-grid">
				{issues.map((issue) => (
					<Issue key={issue.id} issue={issue} />
				))}
			</div>
		</div>
	);
}

export default App;
