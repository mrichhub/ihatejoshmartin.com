import { useEffect, useState } from "react"
import { rediSync } from "../../redisync/redisync.client"
import "./addgrievance.component.scss"

type AddGrievanceModalProps = {
	closeRequested: () => unknown
	isOpen: boolean
}

export function AddGrievanceModal(props: AddGrievanceModalProps) {
	function close() {
		setDoShow(false)
		setTimeout(() => props.closeRequested(), 500)
	}

	const [doShow, setDoShow] = useState(false)
	const [name, setName] = useState("")
	const [date, setDate] = useState(new Date().toLocaleDateString())
	const [story, setStory] = useState("")
	const [submitButtonText, setSubmitButtonText] = useState("Submit")
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

	useEffect(() => {
		if (props.isOpen) {
			setDoShow(true)
		}
	}, [props.isOpen])

	async function submitGrievance() {
		setSubmitButtonText("Submitting...")
		setSubmitButtonDisabled(true)

		try {
			await rediSync.addGrievance({
				author: name,
				date,
				dateAdded: new Date(),
				story,
			})

			setSubmitButtonText("Added!")
			setTimeout(() => close(), 50)
		}
		catch (err) {
			console.error("ERROR while submitting grievance:", err)
			setSubmitButtonText("ERROR...")
		}
	}

	if (!props.isOpen) {
		return <></>
	}

	return (
		<div className={`add-grievance-modal-container ${doShow ? "show": ""}`}>
			<div
				className="overlay"
				onClick={() => close()}
			>

			</div>

			<div className="modal">
				<button
					aria-label="Close"
					className="close"
					onClick={() => close()}
				>
					x
				</button>

				<h3>Add Your Grievance</h3>
				<p>
					It's ok, you're in a safe space. We're a community brought together by Josh Martin's atrocities.
					This is where we come to tell our story. Please share your grievance:
				</p>

				<div className="form">
					<label>
						Your Name:
						<input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
					</label>

					<label>
						Date of Grievance:
						<input type="text" value={date} placeholder="Date" onChange={(e) => setDate(e.target.value)} />
					</label>

					<label>
						Your Story:
						<textarea
							onChange={(e) => setStory(e.target.value)}
							placeholder="Story"
							rows={4}
							value={story}
						></textarea>
					</label>

					<button
						disabled={submitButtonDisabled}
						onClick={() => submitGrievance()}
						value={submitButtonText}
					>
						{submitButtonText}
					</button>
				</div>
			</div>
		</div>
	)
}