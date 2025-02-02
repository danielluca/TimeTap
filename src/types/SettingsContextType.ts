import type { Dispatch, SetStateAction } from "react"

export type SettingsContextType = {
	showSettings: boolean
	setShowSettings: Dispatch<SetStateAction<boolean>>
	notificationPermission: NotificationPermission
	setNotificationPermission: Dispatch<SetStateAction<NotificationPermission>>
	timeState: TimeState
	setTimeState: Dispatch<SetStateAction<TimeState>>
}

export interface TimeState {
		workHours: number;
		breakHours: number;
		endTime: number | null;
		isRunning: boolean;
		remainingTime: number;
		name: string;
		backgroundImage: { imageUrl: string; creator: string; profileHandle: string };
	}