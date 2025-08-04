import RediSync, { KeyWatcher, type KeyWatcherOnChanged } from "@redsync/client-js"
import { EventEmitter } from "events"
import { Config } from "../config/config"
import type { Grievance } from "../data/types/grievance.type"
import { GRIEVANCES_KEY } from "./keys"

export class RediSyncClient extends EventEmitter
{
	private readonly _rediSync: RediSync

	constructor(
		apiKey: string,
	) {
		super()

		this._rediSync = new RediSync(apiKey)
		this._rediSync.on("connect", () => this.emit("connect"))
		this._rediSync.on("disconnected", () => this.emit("disconnected"))
	}

	async addGrievance(grievance: Grievance): Promise<void> {
		await this._rediSync.rpush(GRIEVANCES_KEY, `${grievance.author}:::${grievance.date}:::${grievance.dateAdded.getTime()}:::${grievance.story}`)
	}

	async allGrievances(): Promise<Array<Grievance>> {
		const allGrievances: Array<Grievance> = []

		const grievances = await this._rediSync.lrange(GRIEVANCES_KEY, 0, -1)
		for (const grievanceData of grievances) {
			const grievanceParts = grievanceData.split(":::")

			const author = grievanceParts[0]
			const date = grievanceParts[1]
			const dateAdded = new Date(parseInt(grievanceParts[2]))
			const story = grievanceParts[3]

			allGrievances.push({
				author,
				date,
				dateAdded,
				story,
			})
		}

		return allGrievances
	}

	async watch(key: string, onChanged: KeyWatcherOnChanged): Promise<KeyWatcher> {
		return await this._rediSync.watch(key, onChanged)
	}
}

export const rediSync = new RediSyncClient(Config.rediSyncApiKey)
