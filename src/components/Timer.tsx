import { useSettingsContext } from "../hooks/useSettingsContext"

export default function Timer() {
	const { timeState } = useSettingsContext()

	const formatTime = (ms: number) => {
		const seconds = Math.floor((ms / 1000) % 60)
		const minutes = Math.floor((ms / (1000 * 60)) % 60)
		const hours = Math.floor(ms / (1000 * 60 * 60))
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
	}

	return (
		<span className='[font-feature-settings:"tnum"] bg-white/30 inline-flex leading-none rounded-xl overflow-hidden pl-2 pr-3 pb-0.5 py-0 text-left'>
			{formatTime(timeState.remainingTime)}
		</span>
	)
}
