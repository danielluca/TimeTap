import { PlayCircle, StopCircle } from "@phosphor-icons/react"
import { useSettingsContext } from "../hooks/useSettingsContext"
import { getSalutation } from "../utility/getSalutation"
import Timer from "./Timer"

export default function Main() {
	const { name, timeState, setTimeState } = useSettingsContext()

	const startTimer = () => {
		const totalMinutes =
			(timeState.workHours + timeState.breakHours) * 60 * 60 * 1000
		setTimeState((prev) => ({
			...prev,
			endTime: Date.now() + totalMinutes,
			isRunning: true,
			remainingTime: totalMinutes,
		}))
	}

	const resetTimer = () => {
		setTimeState((prev) => ({
			...prev,
			endTime: null,
			isRunning: false,
			remainingTime: 0,
		}))
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
				{name ? ` ${name},` : ","}
				<br /> <span className="inline-block max-w-[22ch]">{getText()}</span>
			</h1>
		</main>
	)
}
