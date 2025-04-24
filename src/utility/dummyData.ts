import type { TimerEntry } from "../types/SettingsContextType";

export function generateDummyHistory(): TimerEntry[] {
  const dummyData: TimerEntry[] = [];
  const now = new Date();
  // Set to first day of current month
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  let daysAdded = 0;
  let currentDay = 0;

  // Continue until we have data for all weekdays in the month (excluding weekends)
  while (daysAdded < 30 && currentDay < 31) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + currentDay);
    
    // Skip weekends (0 is Sunday, 6 is Saturday)
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
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
      
      daysAdded++;
    }
    
    currentDay++;
  }

  return dummyData;
}