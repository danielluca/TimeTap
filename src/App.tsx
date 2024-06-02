import { useState } from "react";
import Header from "./components/Header";
import SettingsRow from "./components/SettingsRow";
import BackgroundImage from "./components/BackgroundImage";

export default function App() {
	const [workHours] = useState<number>(8);
	const [pause] = useState<number>(1);
	const [checkinTime, setCheckinTime] = useState<number>(0);
	const [plannedCheckoutTime, setPlannedCheckoutTime] = useState<number>(0);
	const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
	const [name] = useState<string>("Daniel");

	function handleCheckIn() {
		if (!isCheckedIn) {
			const now = Date.now();
			const chekoutTime = (workHours + pause) * 60 * 60 * 1000;

			setIsCheckedIn(true);
			setCheckinTime(now);
			setPlannedCheckoutTime(now + chekoutTime);
			return;
		}

		setIsCheckedIn(false);
		setCheckinTime(0);
		setPlannedCheckoutTime(0);
		return;
	}

	return (
		<main className="flex flex-col p-[8%] h-screen">
			<section className="text-white">
				<SettingsRow />

				<Header
					duration={plannedCheckoutTime - checkinTime}
					isCheckedIn={isCheckedIn}
					name={name}
					handleCheckInToggle={handleCheckIn}
				/>
			</section>

			<BackgroundImage />
		</main>
	);
}
