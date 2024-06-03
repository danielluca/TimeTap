export const formatTime = (timeInMs: number): string => {
 const hours = Math.floor(timeInMs / (1000 * 60 * 60));
 const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
 const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
 return formattedTime;
};