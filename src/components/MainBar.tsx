import { useEffect } from "react";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { getSalutation } from "../utility/getSalutation";
import Timer from "./Timer";

export default function MainBar() {
	const {
		workHours,
		setWorkingHours,
		pause,
		setPause,
		name,
		setName,
		isCheckedIn,
		setIsCheckedIn,
		plannedCheckoutTime,
		setPlannedCheckoutTime,
	} = useSettingsContext();

	useEffect(() => {
		const session = localStorage.getItem("session");

		if (session) {
			setIsCheckedIn(JSON.parse(session).isCheckedIn);
			setPlannedCheckoutTime(JSON.parse(session).plannedCheckoutTime);
			setWorkingHours(JSON.parse(session).workHours);
			setPause(JSON.parse(session).pause);
			setName(JSON.parse(session).name);
		}
	}, [setIsCheckedIn, setPlannedCheckoutTime]);

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
					workHours: workHours,
					pause: pause,
					name: name,
				}),
			);

			return;
		}

		setIsCheckedIn(false);
		setPlannedCheckoutTime(null);
		localStorage.removeItem("session");

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
