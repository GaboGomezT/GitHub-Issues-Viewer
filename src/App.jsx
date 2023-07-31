import "./App.css";
import RepoURL from "./components/RepoURL";
import { useState } from "react";

function App() {
	const [issues, setIssues] = useState([]);
	return (
		<div>
			<RepoURL setIssues={setIssues} issues={issues} />
		</div>
	);
}

export default App;
