import { PlayCircle, StopCircle, X } from "@phosphor-icons/react"
import { useSettingsContext } from "../hooks/useSettingsContext"
import { getSalutation } from "../utility/getSalutation"
import Timer from "./Timer"
import { useState } from "react"
import { ModalDialog } from "./ModalDialog"

export default function Main() {
	const { timeState, setTimeState, setHistory } = useSettingsContext()
	const [startAlert, setStartAlert] = useState(false)
	const [stopAlert, setStopAlert] = useState(false)

	const startTimer = () => {
		const totalMilliseconds =
			(timeState.workHours + timeState.breakHours) * 60 * 60 * 1000
		const now = Date.now()
		const startTime = timeState.startTime || now
		const endTime = startTime + totalMilliseconds

		setTimeState((prev) => ({
			...prev,
			startTime,
			endTime,
			isRunning: true,
			remainingTime: Math.max(0, endTime - now),
		}))
	}

	const stopTimer = () => {
		if (timeState.startTime && timeState.endTime) {
			setTimeState((prev) => ({
				...prev,
				startTime: null,
				endTime: null,
				isRunning: false,
				remainingTime: 0,
			}))

			setHistory((prev) => [
				...prev,
				{
					date: new Date(),
					startTime: timeState.startTime || 0,
					endTime: new Date().getTime(),
				},
			])
		}
	}

	const getText = () => {
		if (!timeState.isRunning)
			return (
				<>
					ready to{" "}
					<button
						type="button"
						className="inline text-left hover:text-green-200 text-green-100 transition-colors"
						onClick={() => setStartAlert(true)}
					>
						start <PlayCircle className="inline" weight="fill" /> your work
					</button>{" "}
					day?
				</>
			)

		return (
			<>
				there are <Timer /> hours left until your work day is complete.{" "}
				<button
					type="button"
					className="inline text-left hover:text-red-300 text-red-200 transition-colors"
					onClick={() => setStopAlert(true)}
				>
					End <StopCircle className="inline" weight="fill" /> work
				</button>{" "}
				day now.
			</>
		)
	}

	return (
		<main className="p-[10vw]">
			<ModalDialog
				isOpen={startAlert}
				onClose={() => setStartAlert(false)}
				className="max-w-md"
			>
				<form action="" className="w-full grid gap-4">
					<header className="text-center">
						<h2 className="text-2xl font-semibold text-center">
							Start work day
						</h2>
					</header>

					<main className="flex flex-col gap-4 mt-4">
						<label className="flex flex-col gap-1 font-semibold">
							<span>Starting time</span>
							<input
								type="time"
								className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
								name="startTime"
								defaultValue={new Date().toLocaleTimeString()}
								onChange={(e) =>
									setTimeState((prev) => ({
										...prev,
										startTime: new Date(
											`${new Date().toDateString()} ${e.target.value}`,
										).getTime(),
									}))
								}
							/>
						</label>
					</main>

					<footer className="grid gap-2">
						<button
							type="button"
							className="bg-slate-200 font-semibold py-2 px-4 rounded-lg hover:bg-green-300 transition-colors w-full"
							onClick={() => {
								startTimer()
								setStartAlert(false)
							}}
						>
							Start now
						</button>
					</footer>
				</form>
			</ModalDialog>

			<ModalDialog
				isOpen={stopAlert}
				onClose={() => setStopAlert(false)}
				className="max-w-md"
			>
				<form action="" className="w-full grid gap-8">
					<header className="flex flex-col gap-2 justify-between items-center">
						<h2 className="text-2xl font-semibold text-center">
							Stop work day
						</h2>

						<p className="text-center text-balance">
							Do you really want to end your work day before the timer ends?
						</p>
					</header>

					<footer className="grid gap-2">
						<button
							type="button"
							className="bg-slate-200 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors w-full"
							onClick={() => {
								stopTimer()
								setStopAlert(false)
							}}
						>
							Yes, end now
						</button>

						<button
							type="button"
							className="bg-slate-200 font-semibold py-2 px-4 rounded-lg hover:bg-red-300 transition-colors w-full"
							onClick={() => setStopAlert(false)}
						>
							Cancel
						</button>
					</footer>
				</form>
			</ModalDialog>

			<h1 className="text-[max(8ch,_4.5vw)] font-medium tracking-[-0.2vw] leading-none">
				Good {getSalutation()}
				{timeState.name ? ` ${timeState.name},` : ","}
				<br /> <span className="inline-block max-w-[22ch]">{getText()}</span>
			</h1>
		</main>
	)
}
