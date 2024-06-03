import Timer from "../components/Timer";

export function getText(
	plannedCheckoutTime: number | null,
	isCheckedIn: boolean,
	handleCheckInToggle: () => void,
) {
	if (!isCheckedIn)
		return (
			<>
				ready to{" "}
				<button
					type="button"
					className="inline text-left hover:text-white/80 transition-all underline"
					onClick={handleCheckInToggle}
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
				className="inline text-left hover:text-white/80 transition-all underline"
				onClick={handleCheckInToggle}
			>
				finish your work
			</button>{" "}
			day
		</>
	);
}
