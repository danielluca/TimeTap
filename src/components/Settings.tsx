import {
	BellRinging,
	BowlFood,
	CheckCircle,
	ClockCountdown,
	GearSix,
} from "@phosphor-icons/react"
import { createPortal } from "react-dom"
import { useSettingsContext } from "../hooks/useSettingsContext"
import { formatTime } from "../utility/formatTime"
import convertTimeToMilliseconds from "../utility/convertToMilliseconds"
import { images } from "../constants/images"
import classNames from "classnames"

export default function Settings() {
	const { workHours, pause, showSettings, setShowSettings } =
		useSettingsContext()

	return (
		<header className="flex flex-wrap justify-between gap-8 font-medium p-8">
			<div className="inline-flex items-center gap-2">
				<img src="logo.svg" alt="Logo" width={20} /> TimeTap
			</div>

			<div className="flex gap-3">
				<button
					type="button"
					className="inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Set your working time"
					onClick={() => setShowSettings(true)}
				>
					<ClockCountdown weight="fill" /> {formatTime(workHours).short} working
					time
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Set your break time"
					onClick={() => setShowSettings(true)}
				>
					<BowlFood weight="fill" /> {formatTime(pause).short} break time
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-md px-2 py-1"
					title="Settings"
					onClick={() => setShowSettings(true)}
				>
					<GearSix weight="fill" />
				</button>
			</div>

			{showSettings && createPortal(<Dialog />, document.body)}
		</header>
	)
}

function Dialog() {
	const {
		name,
		setName,
		workHours,
		setWorkingHours,
		pause,
		setPause,
		setShowSettings,
		notificationPermission,
		setNotificationPermission,
		backgroundImage,
		setBackgroundImage,
	} = useSettingsContext()

	function requestForNotificationPermission() {
		if (!("Notification" in window)) {
			console.error("This browser does not support desktop notification")
		}

		if (Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					setNotificationPermission("granted")
					new Notification("Thank you for allowing notifications!")
				}
			})
		}
	}

	return (
		<div className="absolute flex justify-center items-center inset-0 bg-slate-700/80 overflow-hidden">
			<form
				className="p-8 bg-slate-100 rounded-xl flex flex-col gap-8 w-full max-w-md shadow-2xl shadow-slate-800"
				onSubmit={(e) => {
					e.preventDefault()
					return setShowSettings(false)
				}}
			>
				<header>
					<h2 className="text-2xl font-semibold">Settings</h2>
				</header>

				<main className="flex flex-col gap-4">
					<label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-tight">
						<span>Name</span>
						<input
							type="text"
							className="border border-slate-200 p-2 px-3 rounded-md text-base font-normal tracking-normal bg-slate-50"
							placeholder="Your name"
							defaultValue={name}
							name="firstname"
							onChange={(e) => {
								return setName(e.target.value)
							}}
						/>
					</label>

					<label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-tight">
						<span>Working time</span>
						<input
							type="time"
							className="border border-slate-200 p-2 px-3 rounded-md text-base font-normal tracking-normal bg-slate-50"
							placeholder="8 hours"
							defaultValue={formatTime(workHours).short}
							name="workHours"
							onChange={(e) => {
								return setWorkingHours(
									convertTimeToMilliseconds(e.target.value),
								)
							}}
						/>
					</label>

					<label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-tight">
						<span>Break time</span>
						<input
							type="time"
							className="border border-slate-200 p-2 px-3 rounded-md text-base font-normal tracking-normal bg-slate-50"
							placeholder="1 hour"
							defaultValue={formatTime(pause).short}
							name="pause"
							onChange={(e) => {
								return setPause(convertTimeToMilliseconds(e.target.value))
							}}
						/>
					</label>

					<label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-tight">
						<span>Background image</span>

						<fieldset className="flex gap-2">
							{images.map((image) => (
								<label
									key={image.imageUrl}
									className={
										"flex flex-1 overflow-hidden rounded-md cursor-pointer hover:opacity-80 transition-opacity relative bg-slate-200 aspect-square size-12"
									}
								>
									<input
										type="radio"
										name="background"
										value={image.imageUrl}
										className="sr-only"
										onClick={() => {
											return setBackgroundImage(image)
										}}
									/>
									<img
										src={image.imageUrl}
										alt={`Background by ${image.creator}`}
										className={classNames("object-cover w-full h-full", {
											"opacity-30": image.imageUrl === backgroundImage.imageUrl,
										})}
									/>
									{image.imageUrl === backgroundImage.imageUrl && (
										<div className="absolute w-full h-full flex justify-center items-center">
											<CheckCircle
												size={18}
												weight="bold"
												color="currentColor"
											/>
										</div>
									)}
								</label>
							))}
						</fieldset>
					</label>

					{notificationPermission !== "granted" && (
						<button
							className="bg-slate-200 text-black text-base tracking-normal px-4 py-2 rounded-md hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center transition-colors disabled:hover:bg-green-200 disabled:bg-green-200"
							type="button"
							onClick={() => requestForNotificationPermission()}
						>
							<BellRinging weight="bold" color="currentColor" />
							Allow notifications
						</button>
					)}
				</main>

				<footer>
					<button
						type="submit"
						className="bg-slate-200 text-black px-4 py-2 rounded-md hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
					>
						Done
					</button>
				</footer>
			</form>
		</div>
	)
}
