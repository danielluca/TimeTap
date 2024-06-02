import { useEffect, useState } from "react";

export default function Timer({ duration }: { duration: number }) {
	const [currentTime, setCurrentTime] = useState<number>(duration); //ms

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime((prevTime) => prevTime - 1000);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (currentTime <= 0) {
			setCurrentTime(0);
		}
	}, [currentTime]);

	const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600000);
		const minutes = Math.floor((time - hours * 3600000) / 60000);
		const seconds = Math.floor(
			(time - hours * 3600000 - minutes * 60000) / 1000,
		);

		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<span className='[font-feature-settings:"tnum"] bg-white/30 inline-flex leading-none rounded-xl overflow-hidden px-3 py-0'>
			{formatTime(currentTime)}
		</span>
	);
}
