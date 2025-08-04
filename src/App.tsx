import { useState } from "react"
import "./App.scss"
import joshAwfulPic from "./assets/DontYouJustHateJoshMartin.jpeg"
import { AddGrievanceModal } from "./components/addgrievance/addgrievance.component"
import { useGrievances } from "./hooks/useGrievances"

export default function App() {
	const grievances = useGrievances()
	const [addGrievanceModalOpen, setAddGrievanceModalOpen] = useState(false)

	const grievancesReversed = [...grievances].reverse()

	return (
		<>
			<img src={joshAwfulPic} className="josh-martin-awful-pic" alt="Don't you just hate Josh Martin?" />

			<h1>I HATE Josh Martin</h1>

			<p className="why-do-we-hate-josh-martin">
				Why? Because he thinks he's SO good, and he is, and I HATE that!
			</p>

			<div className="grievances">
				<h2>Grievances</h2>
				<button onClick={() => setAddGrievanceModalOpen(true)}>Add Grievance</button>
				{grievancesReversed.map((grievance, index) => (
					<div className="grievance" key={`grievance-${grievancesReversed.length - index}`}>
						<div className="grievance-count">Grievance #{grievancesReversed.length - index}</div>
						<div className="grievance-date">On {grievance.date}</div>
						<div className="grievance-story">{grievance.story}</div>
						<div className="grievance-author">
							{grievance.author} ({grievance.dateAdded.toLocaleDateString()})
						</div>
					</div>
				))}
			</div>

			<AddGrievanceModal isOpen={addGrievanceModalOpen} closeRequested={() => setAddGrievanceModalOpen(false)} />
		</>
	)
}
