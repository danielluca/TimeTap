export const getServerTime = async () => {
	const response = await fetch(
		"http://worldtimeapi.org/api/timezone/Europe/Berlin",
	)
	const { datetime } = await response.json()
	const time = new Date(datetime).getTime()
	return time
}
