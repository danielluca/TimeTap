import type { SettingsContextType } from "./SettingsContextType";

export type Session = Pick<
	SettingsContextType,
	| "workHours"
	| "pause"
	| "isCheckedIn"
	| "name"
	| "plannedCheckoutTime"
	| "checkedInTime"
>;
