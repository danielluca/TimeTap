import { useEffect, useState, useRef } from "react"
import { useSettingsContext } from "../hooks/useSettingsContext"
import { formatTime } from "../utility/formatTime"
import { getServerTime } from "../utility/getServerTime"

export default function Timer() {
	const { setIsCheckedIn, plannedCheckoutTime } = useSettingsContext()
	const workerRef = useRef<Worker>()
	const [now, setNow] = useState(Date.now())
	const [currentTime, setCurrentTime] = useState<number>(
		plannedCheckoutTime ? plannedCheckoutTime - now : 0,
	)

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
				return new Notification("Your work day is over", {
					body: "Well done, have a nice evening and get some rest.",
					icon: "public/favicon.png",
				})
			}
		}

		return () => {
			workerRef.current?.terminate()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const intervalId = setInterval(async () => {
			const serverTime = await getServerTime()
			setNow(serverTime)
		}, 10000) // 10 seconds

		return () => clearInterval(intervalId)
	}, [])

	useEffect(() => {
		setCurrentTime(plannedCheckoutTime ? plannedCheckoutTime - now : 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [now])

	useEffect(() => {
		workerRef.current?.postMessage(currentTime)
	}, [currentTime])

	return (
		<span className='[font-feature-settings:"tnum"] bg-white/30 inline-flex leading-none rounded-xl overflow-hidden pl-2 pr-3 pb-0.5 py-0 text-left'>
			{formatTime(currentTime).long}
		</span>
	)
}
