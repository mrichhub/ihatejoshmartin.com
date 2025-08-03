import "./App.css"
import joshAwfulPic from "./assets/DontYouJustHateJoshMartin.jpeg"

function App() {
	return (
		<>
			<img src={joshAwfulPic} className="josh-martin-awful-pic" alt="Don't you just hate Josh Martin?" />

			<h1>I HATE Josh Martin</h1>

			<p className="why-do-we-hate-josh-martin">
				Why? Because he thinks he's SO good, and he is, and I HATE that!
			</p>
		</>
	)
}

export default App
