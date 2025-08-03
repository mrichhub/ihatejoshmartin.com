import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { Config } from "./config/config.ts"
import "./index.css"

const root = createRoot(
	document.getElementById("root")!,
)

if (Config.useStrict) {
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
}
else {
	root.render(
		<App />
	)
}
