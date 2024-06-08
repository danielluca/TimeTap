
export default function convertTimeToMilliseconds(time: string) {
 const [hours, minutes] = time.split(':').map(Number);
 return (hours * 60 * 60 + minutes * 60) * 1000;
}