import {
	type ReactNode,
	createContext,
	useState,
	useMemo,
	useEffect,
} from "react";
import type { SettingsContextType } from "../types/SettingsContextType";
import type { Session } from "../types/Session";

export const SettingsContext = createContext<SettingsContextType | null>(null);

const storedSession = localStorage.getItem("session");
const session: Session = JSON.parse(storedSession || "{}");

export default function SettingsContextProvider({
	children,
}: { children: ReactNode }) {
	const [workHours, setWorkingHours] = useState(
		storedSession ? session.workHours : 28800000,
	);
	const [pause, setPause] = useState(storedSession ? session.pause : 2700000);
	const [isCheckedIn, setIsCheckedIn] = useState(
		storedSession ? session.isCheckedIn : false,
	);
	const [name, setName] = useState(storedSession ? session.name : "");
	const [plannedCheckoutTime, setPlannedCheckoutTime] = useState(
		storedSession ? session.plannedCheckoutTime : null,
	);
	const [checkedInTime, setCheckedInTime] = useState(
		storedSession ? session.checkedInTime : 0,
	);
	const [notificationPermission, setNotificationPermission] =
		useState<NotificationPermission>("default");
	const [isOpen, setIsOpen] = useState(false);

	// Check if Notifications are granted
	useEffect(() => {
		return setNotificationPermission(Notification.permission);
	}, []);

	// Update the document title and favicon based on the checked in state
	useEffect(() => {
		if (isCheckedIn) {
			document.title = "Checked in";
			document
				.querySelector('link[rel="icon"]')
				?.setAttribute("href", "/favicon-checked-in.png");
		} else {
			document.title = "Checked out";
			document
				.querySelector('link[rel="icon"]')
				?.setAttribute("href", "/favicon.png");
		}
	}, [isCheckedIn]);

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
			}),
		);
	}, [workHours, pause, name, isCheckedIn, plannedCheckoutTime, checkedInTime]);

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
				isOpen,
				setIsOpen,
				checkedInTime,
				setCheckedInTime,
				notificationPermission,
				setNotificationPermission,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}
