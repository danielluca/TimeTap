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
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export default function SettingsContextProvider({
	children,
}: { children: ReactNode }) {
	const [workHours, setWorkingHours] = useState<number>(28800000);
	const [pause, setPause] = useState<number>(3600000);
	const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
	const [name, setName] = useState<string>("Daniel");
	const [plannedCheckoutTime, setPlannedCheckoutTime] = useState<number | null>(
		null,
	);

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
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}
