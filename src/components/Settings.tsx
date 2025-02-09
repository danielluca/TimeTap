import {
	BellRinging,
	BowlFood,
	CheckCircle,
	ClockCountdown,
	GearSix,
	Timer,
	X,
} from "@phosphor-icons/react"
import { useSettingsContext } from "../hooks/useSettingsContext"
import { images } from "../constants/images"
import classNames from "classnames"
import { ModalDialog } from "./ModalDialog"
import { useState } from "react"

export default function Settings() {
	const {
		timeState,
		showSettings,
		setShowSettings,
		showHistory,
		setShowHistory,
	} = useSettingsContext()

	return (
		<header className="flex flex-wrap justify-between gap-8 font-medium p-8">
			<div className="inline-flex items-center gap-2">
				<img src="logo.svg" alt="Logo" width={20} /> TimeTap
			</div>

			<div className="flex gap-3">
				<button
					type="button"
					className="hidden md:inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1"
					title="Set your working time"
					onClick={() => setShowSettings(true)}
				>
					<ClockCountdown weight="fill" /> {timeState.workHours}h work time
				</button>

				<button
					type="button"
					className="hidden group relative md:inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1"
					title="Set your break time"
					onClick={() => setShowSettings(true)}
				>
					<BowlFood weight="fill" /> {timeState.breakHours}h break time
				</button>

				<button
					type="button"
					className="hidden group relative md:inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1"
					title="View your history"
					onClick={() => setShowHistory(true)}
				>
					<Timer weight="fill" /> History
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1 aspect-square"
					title="All settings"
					onClick={() => setShowSettings(true)}
				>
					<GearSix weight="fill" />
				</button>
			</div>

			<ModalDialog isOpen={showSettings} onClose={() => setShowSettings(false)}>
				<Options />
			</ModalDialog>

			<ModalDialog isOpen={showHistory} onClose={() => setShowHistory(false)}>
				<History />
			</ModalDialog>
		</header>
	)
}

function Options() {
	const {
		setShowSettings,
		notificationPermission,
		setNotificationPermission,
		timeState,
		setTimeState,
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
		<form
			onSubmit={(e) => {
				e.preventDefault()
				return setShowSettings(false)
			}}
		>
			<header className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Settings</h2>

				<button
					type="button"
					className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center aspect-square transition-colors font-semibold"
					onClick={() => setShowSettings(false)}
				>
					<X weight="bold" color="currentColor" size={16} />
				</button>
			</header>

			<main className="flex flex-col gap-4 mt-8">
				<label className="flex flex-col gap-1 font-semibold">
					<span>Name</span>
					<input
						type="text"
						className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
						placeholder="Your name"
						defaultValue={timeState.name}
						name="firstname"
						onChange={(e) => {
							return setTimeState((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}}
					/>
				</label>

				<label className="flex flex-col gap-1 font-semibold">
					<span>Initial starting time (Optional)</span>
					<input
						type="time"
						className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
						name="startTime"
						value={
							timeState.startTime
								? new Date(timeState.startTime).toLocaleTimeString()
								: ""
						}
						onChange={(e) => {
							const [hours, minutes] = e.target.value.split(":").map(Number)
							const startTime = new Date()
							startTime.setHours(hours, minutes, 0, 0)
							setTimeState((prev) => ({
								...prev,
								startTime: startTime.getTime(),
							}))
						}}
					/>
				</label>

				<label className="flex flex-col gap-1 font-semibold">
					<span>Working time (h)</span>
					<input
						type="number"
						step={0.25}
						min={0.25}
						max={24}
						className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
						placeholder="8 hours"
						value={timeState.workHours}
						name="workHours"
						onChange={(e) => {
							return setTimeState((prev) => ({
								...prev,
								workHours: Number(e.target.value),
							}))
						}}
					/>
				</label>

				<label className="flex flex-col gap-1 font-semibold">
					<span>Break time (h)</span>
					<input
						type="number"
						step={0.25}
						min={0}
						max={6}
						className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
						placeholder="1 hour"
						value={timeState.breakHours}
						name="pause"
						onChange={(e) => {
							return setTimeState((prev) => ({
								...prev,
								breakHours: Number(e.target.value),
							}))
						}}
					/>
				</label>

				<label className="flex flex-col gap-1 font-semibold">
					<span>Background image</span>

					<fieldset className="grid grid-cols-4 gap-2">
						{images.map((image) => (
							<label
								key={image.imageUrl}
								className={
									"flex overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity relative bg-slate-200 aspect-video"
								}
							>
								<input
									type="radio"
									name="background"
									value={image.imageUrl}
									className="sr-only"
									onClick={() => {
										setTimeState((prev) => ({
											...prev,
											backgroundImage: image,
										}))
									}}
								/>
								<img
									loading="lazy"
									src={image.imageUrl}
									alt={`Background by ${image.creator}`}
									className={classNames("object-cover w-full h-full", {
										"opacity-30":
											image.imageUrl === timeState.backgroundImage.imageUrl,
									})}
									width={146}
									height={82}
								/>
								{image.imageUrl === timeState.backgroundImage.imageUrl && (
									<div className="absolute w-full h-full flex justify-center items-center">
										<CheckCircle size={24} weight="bold" color="currentColor" />
									</div>
								)}
							</label>
						))}
					</fieldset>
				</label>

				{notificationPermission !== "granted" && (
					<button
						className="bg-slate-200 text-base tracking-normal px-4 py-2 rounded-lg hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center transition-colors disabled:hover:bg-green-200 disabled:bg-green-200"
						type="button"
						onClick={() => requestForNotificationPermission()}
					>
						<BellRinging weight="bold" color="currentColor" />
						Allow notifications
					</button>
				)}
			</main>
		</form>
	)
}

function History() {
	const { setShowHistory, timeState, setTimeState } = useSettingsContext()
	const [alert, setAlert] = useState(false)

	const downloadHistoryCSV = () => {
		if (!timeState.history?.length) return

		// Create CSV content
		const headers = "Date,Start Time,End Time\n"
		const csvContent = timeState.history.reduce((acc, entry) => {
			return `${acc}${entry.date},${new Date(
				entry.startTime,
			).toLocaleTimeString()},${new Date(entry.endTime).toLocaleTimeString()}\n`
		}, headers)

		// Create blob and download link
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
		const link = document.createElement("a")
		const url = URL.createObjectURL(blob)

		link.setAttribute("href", url)
		link.setAttribute(
			"download",
			`timer-history-${new Date().toISOString().split("T")[0]}.csv`,
		)
		link.style.visibility = "hidden"

		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const renderHistory = () => {
		if (!timeState.history?.length) return null

		return (
			<tbody className="divide-y divide-gray-200">
				{timeState.history.map((entry) => (
					<tr key={entry.startTime}>
						<td className="py-2">{entry.date}</td>
						<td className="py-2">
							{new Date(entry.startTime).toLocaleTimeString("de-DE", {
								timeStyle: "short",
							})}
						</td>
						<td className="py-2">
							{new Date(entry.endTime).toLocaleTimeString("de-DE", {
								timeStyle: "short",
							})}
						</td>
					</tr>
				))}
			</tbody>
		)
	}

	return (
		<div className="w-full">
			<header className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">History</h2>

				<button
					type="button"
					className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center aspect-square transition-colors font-semibold"
					onClick={() => setShowHistory(false)}
				>
					<X weight="bold" color="currentColor" size={16} />
				</button>
			</header>

			<main className="flex flex-col gap-4 my-8 max-h-96 overflow-scroll">
				<table className="min-w-full">
					<thead className="sticky top-0 bg-slate-100">
						<tr>
							<th scope="col" className="py-2 text-left font-medium border-b">
								Date
							</th>
							<th scope="col" className="py-2 text-left font-medium border-b">
								Start Time
							</th>
							<th scope="col" className="py-2 text-left font-medium border-b">
								End Time
							</th>
						</tr>
					</thead>
					{renderHistory()}
				</table>
			</main>

			<footer className="grid gap-2">
				<button
					type="button"
					onClick={downloadHistoryCSV}
					className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
				>
					Download as CSV
				</button>

				<button
					type="button"
					className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
					onClick={() => {
						if (alert) {
							setTimeState((prev) => ({ ...prev, history: [] }))
							setShowHistory(false)
						} else {
							setAlert(true)
						}
					}}
				>
					{alert ? "Click again to delete" : "Clear History"}
				</button>
			</footer>
		</div>
	)
}
