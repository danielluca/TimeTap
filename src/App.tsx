import Main from "./components/Main"
import Settings from "./components/Settings"
import Background from "./components/Background"
import SettingsContextProvider from "./contexts/SettingsContextProvider"

export default function App() {
	return (
		<div className="h-screen text-white selection:text-white">
			<SettingsContextProvider>
				<Settings />
				<Main />
				<Background />
			</SettingsContextProvider>
		</div>
	)
}
