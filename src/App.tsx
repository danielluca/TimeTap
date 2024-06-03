import { useEffect, useState } from "react";
import Header from "./components/Header";
import SettingsRow from "./components/SettingsRow";
import BackgroundImage from "./components/BackgroundImage";

export default function App() {
	const [workHours] = useState<number>(28800000);
	const [pause] = useState<number>(3600000);
	const [plannedCheckoutTime, setPlannedCheckoutTime] = useState<number | null>(
		null,
	);
	const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
	const [name] = useState<string>("Daniel");

	function handleCheckIn() {
		if (!isCheckedIn) {
			const now = Date.now();
			const chekoutTime = workHours + pause;

			setIsCheckedIn(true);
			setPlannedCheckoutTime(now + chekoutTime);

			localStorage.setItem(
				"session",
				JSON.stringify({
					isCheckedIn: true,
					plannedCheckoutTime: now + chekoutTime,
				}),
			);

			return;
		}

		setIsCheckedIn(false);
		setPlannedCheckoutTime(null);
		localStorage.removeItem("session");

		return;
	}

	useEffect(() => {
		const session = localStorage.getItem("session");

		if (session) {
			setIsCheckedIn(JSON.parse(session).isCheckedIn);
			setPlannedCheckoutTime(JSON.parse(session).plannedCheckoutTime);
		}
	}, []);

	return (
		<main className="flex flex-col h-screen pt-24">
			<section className="text-white container mx-auto">
				<SettingsRow />

				<Header
					plannedCheckoutTime={plannedCheckoutTime}
					isCheckedIn={isCheckedIn}
					name={name}
					handleCheckInToggle={handleCheckIn}
				/>
			</section>

			<BackgroundImage />
		</main>
	);
}
