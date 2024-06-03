import { BowlFood, Calendar, ClockCountdown } from "@phosphor-icons/react";

export default function SettingsRow() {
	return (
		<div className="flex flex-wrap gap-8 font-medium">
			<label className="inline-flex items-center gap-2  px-2 py-1">
				<Calendar weight="fill" />{" "}
				{new Date().toLocaleDateString("en-EN", {
					weekday: "long",
					day: "numeric",
					month: "long",
					year: "numeric",
				})}
			</label>

			<button
				type="button"
				className="inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
				title="Set your working time"
			>
				<ClockCountdown weight="fill" /> 08:00 working time
			</button>

			<button
				type="button"
				className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
				title="Set your break time"
			>
				<BowlFood weight="fill" /> 01:00 break time
			</button>
		</div>
	);
}
