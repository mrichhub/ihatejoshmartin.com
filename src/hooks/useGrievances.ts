import { useEffect, useState } from "react"
import type { Grievance } from "../data/types/grievance.type"
import { GrievancesWatcher } from "../redisync/keyWatchers/grievancesWatcher"

let grievancesWatcher: GrievancesWatcher

export function useGrievances() {
	grievancesWatcher ??= new GrievancesWatcher()

	const [grievances, setGrievances] = useState(grievancesWatcher.lastValue ?? [])

	useEffect(() => {
		const grievancesChanged = (grievances: Array<Grievance>) => {
			setGrievances(grievances)
		}

		grievancesWatcher.watch(grievancesChanged)

		return () => {
			grievancesWatcher.stopWatching(grievancesChanged)
		}
	}, [])

	return grievances
}