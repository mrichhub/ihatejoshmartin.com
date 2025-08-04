import type { Grievance } from "../../data/types/grievance.type"
import { GRIEVANCES_KEY } from "../keys"
import { rediSync } from "../redisync.client"
import { RediSyncKeyWatcher } from "./redisyncKeyWatcher"

export class GrievancesWatcher extends RediSyncKeyWatcher<Array<Grievance>>
{
	constructor() {
		super(GRIEVANCES_KEY)
	}

	protected async retrieveKeyValue(): Promise<Grievance[]> {
		return await rediSync.allGrievances()
	}
}
