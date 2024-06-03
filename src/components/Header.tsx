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
		<div className="mt-8">
			<h1 className="text-7xl font-medium tracking-tighter text-balance">
				{introText} {stateText}
			</h1>
		</div>
	);
}
