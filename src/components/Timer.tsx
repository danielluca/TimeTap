import { useEffect, useState } from "react";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { formatTime } from "../utility/formatTime";

export default function Timer() {
	const { setIsCheckedIn, plannedCheckoutTime } = useSettingsContext();

	const now = Date.now();
	const [currentTime, setCurrentTime] = useState<number>(
		plannedCheckoutTime ? plannedCheckoutTime - now : 0,
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime((prevTime) => prevTime - 1000);
		}, 1000);

		if (currentTime <= 0) {
			setCurrentTime(0);
			setIsCheckedIn(false);
			new Notification("You have reached your checkout time!");
			return clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [currentTime]);

	return (
		<span className='[font-feature-settings:"tnum"] bg-white/30 inline-flex leading-none rounded-xl overflow-hidden pl-2 pr-3 pb-0.5 py-0 text-left'>
			{formatTime(currentTime).long}
		</span>
	);
}
