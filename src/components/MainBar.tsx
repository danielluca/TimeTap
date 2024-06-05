import { useSettingsContext } from "../hooks/useSettingsContext";
import { getSalutation } from "../utility/getSalutation";
import Timer from "./Timer";

export default function MainBar() {
	const {
		workHours,
		pause,
		name,
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

			return;
		}

		setIsCheckedIn(false);
		setPlannedCheckoutTime(null);

		return;
	}

	const getText = () => {
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
					end your work
				</button>{" "}
				day
			</>
		);
	};

	return (
		<div className="p-[10vw]">
			<h1 className="text-[max(8ch,_4.5vw)] font-medium tracking-[-0.2vw] leading-none text-balance">
				Good {getSalutation()} {name}, {getText()}
			</h1>
		</div>
	);
}
