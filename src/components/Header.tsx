import { useEffect } from "react";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { getSalutation } from "../utility/getSalutation";
import { getText } from "../utility/getText";

export default function Header() {
	const { name, setIsCheckedIn, setPlannedCheckoutTime } = useSettingsContext();
	const introText = `Good ${getSalutation()} ${name},`;
	const stateText = getText();

	useEffect(() => {
		const session = localStorage.getItem("session");

		if (session) {
			setIsCheckedIn(JSON.parse(session).isCheckedIn);
			setPlannedCheckoutTime(JSON.parse(session).plannedCheckoutTime);
		}
	}, []);

	return (
		<div className="p-[10vw]">
			<h1 className="text-[max(8ch,_4.5vw)] font-medium tracking-[-0.2vw] leading-none text-balance">
				{introText} {stateText}
			</h1>
		</div>
	);
}
