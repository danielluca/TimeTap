import { getSalutation } from "../utility/getSalutation";
import { getText } from "../utility/getText";

export default function Header({
	duration,
	isCheckedIn,
	name,
	handleCheckInToggle,
}: {
	duration: number;
	isCheckedIn: boolean;
	name: string;
	handleCheckInToggle: () => void;
}) {
	const introText = `Good ${getSalutation()} ${name},`;
	const stateText = getText(duration, isCheckedIn, handleCheckInToggle);

	return (
		<div className="mt-8">
			<h1 className="text-8xl font-medium tracking-tighter text-balance leading-none">
				{introText} <br /> {stateText}
			</h1>
		</div>
	);
}
