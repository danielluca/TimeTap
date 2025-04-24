import { type ReactNode, createContext, useState, useEffect } from "react"
import type {
	SettingsContextType,
	TimeState,
	TimerEntry,
} from "../types/SettingsContextType"
import { images } from "../constants/images"

export const SettingsContext = createContext<SettingsContextType | null>(null)

export default function SettingsContextProvider({
	children,
}: { children: ReactNode }) {
	const [notificationPermission, setNotificationPermission] =
		useState<NotificationPermission>("default")

	const [showSettings, setShowSettings] = useState(false)
	const [showHistory, setShowHistory] = useState(false)
	const [showAnalytics, setShowAnalytics] = useState(false)

	const [timeState, setTimeState] = useState<TimeState>(() => {
		const saved = localStorage.getItem("timeState")
		return saved
			? JSON.parse(saved)
			: {
				workHours: 0.25,
				breakHours: 0,
				endTime: null,
				isRunning: false,
				remainingTime: 0,
				name: "",
				backgroundImage: images[0],
				startTime: null,
			}
	})

	const [history, setHistory] = useState<TimerEntry[]>(() => {
		const saved = localStorage.getItem("history")
		return saved ? JSON.parse(saved) : []
	})

	useEffect(() => {
		// Request notification permission on mount
		if ("Notification" in window) {
			Notification.requestPermission().then((permission) => {
				setNotificationPermission(permission)
			})
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("timeState", JSON.stringify(timeState))
	}, [timeState])

	useEffect(() => {
		localStorage.setItem("history", JSON.stringify(history))
	}, [history])

	useEffect(() => {
		if (timeState.isRunning) {
			return document
				.querySelector("link[rel='icon']")
				?.setAttribute("href", "favicon-checked-in.png")
		}

		return document
			.querySelector("link[rel='icon']")
			?.setAttribute("href", "favicon.png")
	}, [timeState.isRunning])

	useEffect(() => {
		if (!timeState.isRunning) return

		const interval = setInterval(() => {
			if (timeState.endTime) {
				const now = Date.now()
				const remaining = Math.max(0, timeState.endTime - now)

				if (remaining <= 0) {
					setTimeState((prev) => ({
						...prev,
						isRunning: false,
						startTime: null,
						endTime: null,
					}))

					setHistory((prev) => [
						...prev,
						{
							date: new Date(),
							startTime: timeState.startTime || 0,
							endTime: timeState.endTime || 0,
						},
					])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeState.isRunning, timeState.endTime])

	return (
		<SettingsContext.Provider
			value={{
				showSettings,
				setShowSettings,
				showHistory,
				setShowHistory,
				showAnalytics,
				setShowAnalytics,
				notificationPermission,
				setNotificationPermission,
				timeState,
				setTimeState,
				history,
				setHistory,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
