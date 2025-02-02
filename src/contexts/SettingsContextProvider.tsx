import { type ReactNode, createContext, useState, useEffect } from "react"
import type {
	SettingsContextType,
	TimeState,
} from "../types/SettingsContextType"
import type { Session } from "../types/Session"
import { images } from "../constants/images"

export const SettingsContext = createContext<SettingsContextType | null>(null)

const storedSession = localStorage.getItem("session")
const session: Session = JSON.parse(storedSession || "{}")

export default function SettingsContextProvider({
	children,
}: { children: ReactNode }) {
	const [name, setName] = useState(storedSession ? session.name : "")

	const [notificationPermission, setNotificationPermission] =
		useState<NotificationPermission>("default")

	const [backgroundImage, setBackgroundImage] = useState(
		storedSession ? session.backgroundImage : images[0],
	)

	const [showSettings, setShowSettings] = useState(false)

	const [timeState, setTimeState] = useState<TimeState>(() => {
		const saved = localStorage.getItem("timeState")
		return saved
			? JSON.parse(saved)
			: {
					workHours: 0.0125,
					breakHours: 0,
					endTime: null,
					isRunning: false,
					remainingTime: 0,
					name: "",
					backgroundImage: images[0],
				}
	})

	useEffect(() => {
		// Request notification permission on mount
		if ("Notification" in window) {
			Notification.requestPermission()
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("timeState", JSON.stringify(timeState))
	}, [timeState])

	useEffect(() => {
		if (!timeState.isRunning) return

		const interval = setInterval(() => {
			if (timeState.endTime) {
				const now = Date.now()
				const remaining = Math.max(0, timeState.endTime - now)

				if (remaining <= 0) {
					setTimeState((prev) => ({ ...prev, isRunning: false }))
					if (
						"Notification" in window &&
						Notification.permission === "granted"
					) {
						new Notification("Work Timer Complete", {
							body: "Your work day is complete!",
							icon: "/favicon.png",
						})
					}
				}

				setTimeState((prev) => ({ ...prev, remainingTime: remaining }))
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [timeState.isRunning, timeState.endTime])

	return (
		<SettingsContext.Provider
			value={{
				name,
				setName,
				showSettings,
				setShowSettings,
				notificationPermission,
				setNotificationPermission,
				backgroundImage,
				setBackgroundImage,
				timeState,
				setTimeState,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
