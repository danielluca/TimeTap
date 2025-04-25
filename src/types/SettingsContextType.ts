import type { Dispatch, SetStateAction } from "react"

export type SettingsContextType = {
	showSettings: boolean
	setShowSettings: Dispatch<SetStateAction<boolean>>
	showInsights: boolean
	setShowInsights: Dispatch<SetStateAction<boolean>>
	notificationPermission: NotificationPermission
	setNotificationPermission: Dispatch<SetStateAction<NotificationPermission>>
	timeState: TimeState
	setTimeState: Dispatch<SetStateAction<TimeState>>
  history: TimerEntry[]
  setHistory: Dispatch<SetStateAction<TimerEntry[]>>
}

export interface TimerEntry {
  date: Date;
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
}