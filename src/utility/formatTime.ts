export const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600000);
		const minutes = Math.floor((time - hours * 3600000) / 60000);
		const seconds = Math.floor(
			(time - hours * 3600000 - minutes * 60000) / 1000,
		);

  const long = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

   const short = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}`

		return {long, short};
	};