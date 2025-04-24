import type { TimerEntry } from "../types/SettingsContextType";

export function generateDummyHistory(numberOfDays = 14): TimerEntry[] {
  const dummyData: TimerEntry[] = [];
  const now = new Date();

  for (let i = 0; i < numberOfDays; i++) {
    // Create an entry for each day
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random work duration between 3-8 hours in milliseconds
    const workDuration = Math.floor(Math.random() * (8 - 3 + 1) + 3) * 3600000;
    
    // Set start time to a random hour between 7 AM and 10 AM
    const startHour = Math.floor(Math.random() * (10 - 7 + 1) + 7);
    const startTime = new Date(date);
    startTime.setHours(startHour, 0, 0, 0);
    
    const endTime = new Date(startTime.getTime() + workDuration);

    dummyData.push({
      date: date,
      startTime: startTime.getTime(),
      endTime: endTime.getTime()
    });
  }

  return dummyData;
}