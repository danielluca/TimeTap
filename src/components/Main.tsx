import { PlayCircle, StopCircle } from "@phosphor-icons/react"
import { useSettingsContext } from "../hooks/useSettingsContext"
import { getSalutation } from "../utility/getSalutation"
import Timer from "./Timer"

export default function Main() {
	const { timeState, setTimeState } = useSettingsContext()

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

	const resetTimer = () => {
		if (timeState.startTime && timeState.endTime) {
			setTimeState((prev) => ({
				...prev,
				endTime: null,
				isRunning: false,
				remainingTime: 0,
				history: [
					...prev.history,
					{
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						date: new Date(timeState.startTime!).toLocaleDateString(),
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						startTime: timeState.startTime!,
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						endTime: timeState.endTime!,
					},
				],
			}))
		}
	}

	const getText = () => {
		if (!timeState.isRunning)
			return (
				<>
					ready to{" "}
					<button
						type="button"
						className="inline text-left hover:text-green-200 transition-colors"
						onClick={() => startTimer()}
					>
						start <PlayCircle className="inline" weight="fill" /> your work
					</button>{" "}
					day?
				</>
			)

		return (
			<>
				there are <Timer /> hours left until you can{" "}
				<button
					type="button"
					className="inline text-left hover:text-red-200 transition-colors"
					onClick={() => resetTimer()}
				>
					end <StopCircle className="inline" weight="fill" /> your work
				</button>{" "}
				day
			</>
		)
	}

	return (
		<main className="p-[10vw]">
			<h1 className="text-[max(8ch,_4.5vw)] font-medium tracking-[-0.2vw] leading-none">
				Good {getSalutation()}
				{timeState.name ? ` ${timeState.name},` : ","}
				<br /> <span className="inline-block max-w-[22ch]">{getText()}</span>
			</h1>
		</main>
	)
}
