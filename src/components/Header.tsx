import { getSalutation } from "../utility/getSalutation";
import { getText } from "../utility/getText";

export default function Header({
	plannedCheckoutTime,
	isCheckedIn,
	name,
	handleCheckInToggle,
}: {
	plannedCheckoutTime: number | null;
	isCheckedIn: boolean;
	name: string;
	handleCheckInToggle: () => void;
}) {
	const introText = `Good ${getSalutation()} ${name},`;
	const stateText = getText(
		plannedCheckoutTime,
		isCheckedIn,
		handleCheckInToggle,
	);

	return (
		<div className="p-[10vw]">
			<h1 className="text-[max(8ch,_4.5vw)] font-medium tracking-[-0.2vw] leading-none text-balance">
				{introText} {stateText}
			</h1>
		</div>
	);
}
