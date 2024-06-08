import {
	type ReactNode,
	createContext,
	useState,
	type Dispatch,
	type SetStateAction,
	useMemo,
	useEffect,
} from "react";

type SettingsContextType = {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	isCheckedIn: boolean;
	setIsCheckedIn: Dispatch<SetStateAction<boolean>>;
	workHours: number;
	setWorkingHours: Dispatch<SetStateAction<number>>;
	pause: number;
	setPause: Dispatch<SetStateAction<number>>;
	plannedCheckoutTime: number | null;
	setPlannedCheckoutTime: Dispatch<SetStateAction<number | null>>;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);
const session = localStorage.getItem("session");

export default function SettingsContextProvider({
	children,
}: { children: ReactNode }) {
	const [workHours, setWorkingHours] = useState<number>(
		session ? JSON.parse(session).workHours : 0,
	);
	const [pause, setPause] = useState<number>(
		session ? JSON.parse(session).pause : 0,
	);
	const [isCheckedIn, setIsCheckedIn] = useState<boolean>(
		session ? JSON.parse(session).isCheckedIn : false,
	);
	const [name, setName] = useState<string>(
		session ? JSON.parse(session).name : "",
	);
	const [plannedCheckoutTime, setPlannedCheckoutTime] = useState<number | null>(
		session ? JSON.parse(session).plannedCheckoutTime : null,
	);
	const [isOpen, setIsOpen] = useState(false);

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

	useMemo(() => {
		localStorage.setItem(
			"session",
			JSON.stringify({
				workHours,
				pause,
				name,
				isCheckedIn,
				plannedCheckoutTime,
			}),
		);
	}, [workHours, pause, name, isCheckedIn, plannedCheckoutTime]);

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
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}
