import Header from "./components/Header";
import SettingsRow from "./components/SettingsRow";
import BackgroundImage from "./components/BackgroundImage";
import SettingsContextProvider from "./contexts/SettingsContextProvider";

export default function App() {
	return (
		<main className="h-screen text-white selection:text-white">
			<SettingsContextProvider>
				<SettingsRow />

				<Header />

				<BackgroundImage />
			</SettingsContextProvider>
		</main>
	);
}
