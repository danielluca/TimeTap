import type { Dispatch, SetStateAction } from "react"

export type SettingsContextType = {
	name: string
	setName: Dispatch<SetStateAction<string>>
	showSettings: boolean
	setShowSettings: Dispatch<SetStateAction<boolean>>
	notificationPermission: NotificationPermission
	setNotificationPermission: Dispatch<SetStateAction<NotificationPermission>>
	backgroundImage: { imageUrl: string; creator: string; profileHandle: string }
	setBackgroundImage: Dispatch<
		SetStateAction<{ imageUrl: string; creator: string; profileHandle: string }>
	>
	timeState: TimeState
	setTimeState: Dispatch<SetStateAction<TimeState>>
}

export interface TimeState {
		workHours: number;
		breakHours: number;
		endTime: number | null;
		isRunning: boolean;
		remainingTime: number;
	}