import type { Dispatch, SetStateAction } from "react"

export type SettingsContextType = {
	showSettings: boolean
	setShowSettings: Dispatch<SetStateAction<boolean>>
	showHistory: boolean
	setShowHistory: Dispatch<SetStateAction<boolean>>
	notificationPermission: NotificationPermission
	setNotificationPermission: Dispatch<SetStateAction<NotificationPermission>>
	timeState: TimeState
	setTimeState: Dispatch<SetStateAction<TimeState>>
}

export interface TimerEntry {
  date: string;
  startTime: number;
  endTime: number;
}

export interface TimeState {
	backgroundImage: {
    imageUrl: string;
    creator: string;
    profileHandle: string;
  };
  workHours: number;
  breakHours: number;
  name: string;
  startTime: number | null;
  endTime: number | null;
  isRunning: boolean;
  remainingTime: number;
  history: TimerEntry[];
}