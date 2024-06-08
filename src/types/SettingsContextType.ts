import type { Dispatch, SetStateAction } from "react";

export type SettingsContextType = {
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
	checkedInTime: number;
	setCheckedInTime: Dispatch<SetStateAction<number>>;
 notificationPermission: NotificationPermission;
 setNotificationPermission: Dispatch<SetStateAction<NotificationPermission>>;
};