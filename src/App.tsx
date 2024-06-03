import MainBar from "./components/MainBar";
import SettingsBar from "./components/SettingsBar";
import BackgroundImage from "./components/BackgroundImage";
import SettingsContextProvider from "./contexts/SettingsContextProvider";

export default function App() {
	return (
		<>
			<main className="h-screen text-white selection:text-white">
				<SettingsContextProvider>
					<SettingsBar />
					<MainBar />
				</SettingsContextProvider>
				<BackgroundImage />
			</main>
		</>
	);
}
