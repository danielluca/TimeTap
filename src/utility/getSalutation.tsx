export function getSalutation() {
	const hour = new Date().getHours();

	switch (true) {
		case hour < 12:
			return "morning";
		case hour < 18:
			return "afternoon";
		default:
			return "evening";
	}
}
