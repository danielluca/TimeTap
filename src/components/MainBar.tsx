import { Play, PlayCircle, StopCircle } from "@phosphor-icons/react";
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
		setPlannedCheckoutTime,
		setCheckedInTime,
	} = useSettingsContext();

	function handleCheckIn() {
		if (!isCheckedIn) {
			const now = Date.now();
			const chekoutTime = workHours + pause;

			setIsCheckedIn(true);
			setCheckedInTime(now);
			setPlannedCheckoutTime(now + chekoutTime);

			return;
		}

		setIsCheckedIn(false);
		setCheckedInTime(0);
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
						className="inline text-left hover:text-green-200 transition-colors"
						onClick={() => handleCheckIn()}
					>
						start <PlayCircle className="inline" weight="fill" /> your work
					</button>{" "}
					day?
				</>
			);

		return (
			<>
				there are <Timer /> hours left until you can{" "}
				<button
					type="button"
					className="inline text-left hover:text-red-200 transition-colors"
					onClick={() => handleCheckIn()}
				>
					end <StopCircle className="inline" weight="fill" /> your work
				</button>{" "}
				day
			</>
		);
	};

	return (
		<div className="p-[10vw]">
			<h1 className="text-[max(8ch,_4.5vw)] font-medium tracking-[-0.2vw] leading-none">
				Good {getSalutation()}
				{name ? ` ${name},` : ","}
				<br /> <span className="inline-block max-w-[22ch]">{getText()}</span>
			</h1>
		</div>
	);
}
