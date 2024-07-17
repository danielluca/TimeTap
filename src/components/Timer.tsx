import { useEffect, useState, useRef } from "react"
import { useSettingsContext } from "../hooks/useSettingsContext"
import { formatTime } from "../utility/formatTime"

export default function Timer() {
	const { setIsCheckedIn, plannedCheckoutTime } = useSettingsContext()

	const now = Date.now()
	const [currentTime, setCurrentTime] = useState<number>(
		plannedCheckoutTime ? plannedCheckoutTime - now : 0,
	)

	const workerRef = useRef<Worker>()

	useEffect(() => {
		workerRef.current = new Worker(
			new URL("../workers/timerWorker.ts", import.meta.url),
		)
		workerRef.current.postMessage(currentTime)
		workerRef.current.onmessage = (event) => {
			setCurrentTime(event.data)

			if (event.data <= 0) {
				setCurrentTime(0)
				setIsCheckedIn(false)
				return new Notification("Your work day has ended!")
			}
		}

		return () => {
			workerRef.current?.terminate()
		}
	}, [])

	useEffect(() => {
		workerRef.current?.postMessage(currentTime)
	}, [now])

	return (
		<span className='[font-feature-settings:"tnum"] bg-white/30 inline-flex leading-none rounded-xl overflow-hidden pl-2 pr-3 pb-0.5 py-0 text-left'>
			{formatTime(currentTime).long}
		</span>
	)
}
