export const formatTime = (ms: number) => {
	// format decimal time like 0.0125 to hh:mm:ss
	const seconds = Math.floor((ms / 1000) % 60)
	const minutes = Math.floor((ms / (1000 * 60)) % 60)
	const hours = Math.floor(ms / (1000 * 60 * 60))
	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}