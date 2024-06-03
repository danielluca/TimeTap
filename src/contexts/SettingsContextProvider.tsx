import {
	type ReactNode,
	createContext,
	useState,
	type Dispatch,
	type SetStateAction,
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

export default function SettingsContextProvider({
	children,
}: { children: ReactNode }) {
	const [workHours, setWorkingHours] = useState<number>(0);
	const [pause, setPause] = useState<number>(0);
	const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
	const [name, setName] = useState<string>("Daniel");
	const [plannedCheckoutTime, setPlannedCheckoutTime] = useState<number | null>(
		null,
	);
	const [isOpen, setIsOpen] = useState(false);

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
