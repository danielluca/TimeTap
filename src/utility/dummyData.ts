import type { TimerEntry } from "../types/SettingsContextType";

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateWorkDay(date: Date): TimerEntry {
  // Generate random work duration (3-8 hours) in milliseconds
  const workDurationHours = getRandomNumber(3, 8);
  const workDurationMs = workDurationHours * 3600000; // Convert hours to milliseconds
  
  // Generate random start time between 7 AM and 10 AM
  const startHour = getRandomNumber(7, 10);
  const startTime = new Date(date);
  startTime.setHours(startHour, 0, 0, 0);
  
  // Calculate end time based on start time and duration
  const endTime = new Date(startTime.getTime() + workDurationMs);

  return {
    date: date,
    startTime: startTime.getTime(),
    endTime: endTime.getTime()
  };
}

function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
}

export function generateDummyHistory(): TimerEntry[] {
  const dummyData: TimerEntry[] = [];
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  let workdaysAdded = 0;
  let currentDay = 0;

  // Generate data for weekdays until we reach 30 days or end of month
  while (workdaysAdded < 30 && currentDay < 31) {
    const currentDate = new Date(firstDayOfMonth);
    currentDate.setDate(firstDayOfMonth.getDate() + currentDay);
    
    if (!isWeekend(currentDate)) {
      dummyData.push(generateWorkDay(currentDate));
      workdaysAdded++;
    }
    
    currentDay++;
  }

  return dummyData;
}