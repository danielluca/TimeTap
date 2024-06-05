import { BowlFood, ClockCountdown } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { formatTime } from "../utility/formatTime";

export default function SettingsBar() {
	const { workHours, pause, isOpen, setIsOpen } = useSettingsContext();

	return (
		<div className="flex flex-wrap justify-between gap-8 font-medium p-8">
			<div>TimeTap</div>

			<div className="flex gap-8">
				<button
					type="button"
					className="inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Set your working time"
					onClick={() => setIsOpen(true)}
				>
					<ClockCountdown weight="fill" /> {formatTime(workHours)} working time
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Set your break time"
					onClick={() => setIsOpen(true)}
				>
					<BowlFood weight="fill" /> {formatTime(pause)} break time
				</button>
			</div>

			{isOpen && createPortal(<Dialog />, document.body)}
		</div>
	);
}

function Dialog() {
	const {
		name,
		setName,
		workHours,
		setWorkingHours,
		pause,
		setPause,
		setIsOpen,
	} = useSettingsContext();

	return (
		<div className="absolute flex justify-center items-center inset-0 bg-black/80 overflow-hidden">
			<form
				className="p-8 bg-white rounded-xl flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target as HTMLFormElement);

					setName(formData.get("firstname") as string);
					setWorkingHours(Number(formData.get("workHours")) * 1000 * 60 * 60);
					setPause(Number(formData.get("pause")) * 1000 * 60 * 60);

					return setIsOpen(false);
				}}
			>
				<label className="flex flex-col">
					Name
					<input
						type="text"
						className="border p-1 px-2 rounded-md"
						placeholder="Your name"
						defaultValue={name}
						name="firstname"
					/>
				</label>

				<label className="flex flex-col">
					Working time
					<input
						type="number"
						className="border p-1 px-2 rounded-md"
						placeholder="8 hours"
						defaultValue={workHours / (1000 * 60 * 60)}
						step={0.25}
						name="workHours"
					/>
				</label>

				<label className="flex flex-col">
					Break time
					<input
						type="number"
						className="border p-1 px-2 rounded-md"
						placeholder="1 hour"
						defaultValue={pause / (1000 * 60 * 60)}
						step={0.25}
						name="pause"
					/>
				</label>

				<button type="submit">Save</button>
			</form>
		</div>
	);
}
