function booleanEnvValue(property: string): boolean {
	const value = import.meta.env[property]
	return (/true/i).test(value)
}

export class Config
{
	static grievancesKeyOverride: string = import.meta.env["VITE_GRIEVANCES_KEY_OVERRIDE"]
	static rediSyncApiKey: string = import.meta.env["VITE_REDISYNC_API_KEY"]
	static useStrict: boolean = booleanEnvValue("VITE_USE_STRICT_MODE")
}
