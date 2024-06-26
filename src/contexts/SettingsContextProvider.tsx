import {
	type ReactNode,
	createContext,
	useState,
	useMemo,
	useEffect,
} from "react"
import type { SettingsContextType } from "../types/SettingsContextType"
import type { Session } from "../types/Session"
import { images } from "../constants/images"

export const SettingsContext = createContext<SettingsContextType | null>(null)

const storedSession = localStorage.getItem("session")
const session: Session = JSON.parse(storedSession || "{}")

export default function SettingsContextProvider({
	children,
}: { children: ReactNode }) {
	const [workHours, setWorkingHours] = useState(
		storedSession ? session.workHours : 28800000,
	)
	const [pause, setPause] = useState(storedSession ? session.pause : 2700000)
	const [isCheckedIn, setIsCheckedIn] = useState(
		storedSession ? session.isCheckedIn : false,
	)
	const [name, setName] = useState(storedSession ? session.name : "")
	const [plannedCheckoutTime, setPlannedCheckoutTime] = useState(
		storedSession ? session.plannedCheckoutTime : null,
	)
	const [checkedInTime, setCheckedInTime] = useState(
		storedSession ? session.checkedInTime : 0,
	)
	const [notificationPermission, setNotificationPermission] =
		useState<NotificationPermission>("default")
	const [backgroundImage, setBackgroundImage] = useState(
		storedSession ? session.backgroundImage : images[0],
	)
	const [showSettings, setShowSettings] = useState(false)

	// Check if Notifications are granted
	useEffect(() => {
		return setNotificationPermission(Notification.permission)
	}, [])

	// Update the document title and favicon based on the checked in state
	useEffect(() => {
		if (isCheckedIn) {
			document.title = "Checked in"
			document
				.querySelector('link[rel="icon"]')
				?.setAttribute("href", "favicon-checked-in.png")
		} else {
			document.title = "Checked out"
			document
				.querySelector('link[rel="icon"]')
				?.setAttribute("href", "favicon.png")
		}
	}, [isCheckedIn])

	// Save the session to local storage
	useMemo(() => {
		localStorage.setItem(
			"session",
			JSON.stringify({
				workHours,
				pause,
				name,
				isCheckedIn,
				plannedCheckoutTime,
				checkedInTime,
				backgroundImage,
			}),
		)
	}, [
		workHours,
		pause,
		name,
		isCheckedIn,
		plannedCheckoutTime,
		checkedInTime,
		backgroundImage,
	])

	return (
		<SettingsContext.Provider
			value={{
				workHours,
				setWorkingHours,
				isCheckedIn,
				setIsCheckedIn,
				name,
				setName,
				plannedCheckoutTime,
				setPlannedCheckoutTime,
				pause,
				setPause,
				showSettings,
				setShowSettings,
				checkedInTime,
				setCheckedInTime,
				notificationPermission,
				setNotificationPermission,
				backgroundImage,
				setBackgroundImage,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
