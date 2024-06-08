import {
	BellRinging,
	BowlFood,
	ClockCountdown,
	GearSix,
} from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { formatTime } from "../utility/formatTime";
import convertTimeToMilliseconds from "../utility/convertToMilliseconds";

export default function SettingsBar() {
	const { workHours, pause, isOpen, setIsOpen } = useSettingsContext();

	return (
		<div className="flex flex-wrap justify-between gap-8 font-medium p-8">
			<div className="inline-flex items-center gap-2">
				<img src="/logo.svg" alt="Logo" width={20} /> TimeTap
			</div>

			<div className="flex gap-3">
				<button
					type="button"
					className="inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Set your working time"
					onClick={() => setIsOpen(true)}
				>
					<ClockCountdown weight="fill" /> {formatTime(workHours).short} working
					time
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Set your break time"
					onClick={() => setIsOpen(true)}
				>
					<BowlFood weight="fill" /> {formatTime(pause).short} break time
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Settings"
					onClick={() => setIsOpen(true)}
				>
					<GearSix weight="fill" />
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
		notificationPermission,
		setNotificationPermission,
	} = useSettingsContext();

	function requestForNotificationPermission() {
		if (!("Notification" in window)) {
			console.error("This browser does not support desktop notification");
		}

		if (Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					setNotificationPermission("granted");
					new Notification("Notifications are enabled");
				}
			});
		}
	}

	return (
		<div className="absolute flex justify-center items-center inset-0 bg-slate-700/80 overflow-hidden">
			<form
				className="p-8 bg-slate-100 rounded-xl flex flex-col gap-8 w-full max-w-md shadow-2xl shadow-slate-800"
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target as HTMLFormElement);

					setName(formData.get("firstname") as string);
					setWorkingHours(convertTimeToMilliseconds(formData.get("workHours")));
					setPause(convertTimeToMilliseconds(formData.get("pause")));

					return setIsOpen(false);
				}}
			>
				<header>
					<h2 className="text-2xl font-semibold">Settings</h2>
				</header>

				<main className="flex flex-col gap-4">
					<label className="flex flex-col text-xs font-semibold uppercase tracking-tight">
						Name
						<input
							type="text"
							className="border p-2 px-3 rounded-md text-base font-normal tracking-normal bg-slate-50"
							placeholder="Your name"
							defaultValue={name}
							name="firstname"
						/>
					</label>

					<label className="flex flex-col text-xs font-semibold uppercase tracking-tight">
						Working time
						<input
							type="time"
							className="border p-2 px-3 rounded-md text-base font-normal tracking-normal bg-slate-50"
							placeholder="8 hours"
							defaultValue={formatTime(workHours).short}
							name="workHours"
						/>
					</label>

					<label className="flex flex-col text-xs font-semibold uppercase tracking-tight">
						Break time
						<input
							type="time"
							className="border p-2 px-3 rounded-md text-base font-normal tracking-normal bg-slate-50"
							placeholder="1 hour"
							defaultValue={formatTime(pause).short}
							name="pause"
						/>
					</label>

					<button
						className="bg-slate-200 text-black px-4 py-2 rounded-md hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center transition-colors  disabled:hover:bg-green-200 disabled:bg-green-200"
						type="button"
						onClick={() => requestForNotificationPermission()}
						disabled={notificationPermission === "granted"}
					>
						<BellRinging weight="bold" color="currentColor" />
						{notificationPermission === "default" && "Activate notifications"}
						{notificationPermission === "granted" && "Notifications are active"}
						{notificationPermission === "denied" && "Notifications are blocked"}
					</button>
				</main>

				<footer>
					<button
						type="submit"
						className="bg-slate-200 text-black px-4 py-2 rounded-md hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
					>
						Save settings
					</button>
				</footer>
			</form>
		</div>
	);
}
