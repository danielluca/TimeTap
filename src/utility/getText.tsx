import Timer from "../components/Timer";
import { useSettingsContext } from "../hooks/useSettingsContext";

export function getText() {
	const {
		workHours,
		pause,
		isCheckedIn,
		setIsCheckedIn,
		plannedCheckoutTime,
		setPlannedCheckoutTime,
	} = useSettingsContext();

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

	if (!isCheckedIn)
		return (
			<>
				ready to{" "}
				<button
					type="button"
					className="inline text-left hover:text-white/80 transition-colors underline"
					onClick={() => handleCheckIn()}
				>
					start your work
				</button>{" "}
				day?
			</>
		);

	return (
		<>
			there are <Timer plannedCheckoutTime={plannedCheckoutTime} /> hours left
			until you can{" "}
			<button
				type="button"
				className="inline text-left hover:text-white/80 transition-colors underline"
				onClick={() => handleCheckIn()}
			>
				finish your work
			</button>{" "}
			day
		</>
	);
}
