import { ArrowSquareOut } from "@phosphor-icons/react"
import { useSettingsContext } from "../hooks/useSettingsContext"

export default function BackgroundImage() {
	const { backgroundImage } = useSettingsContext()
	// const bgImage = useMemo(() => {
	// 	return images[Math.floor(Math.random() * images.length)];
	// }, []);

	return (
		<>
			<a
				href={backgroundImage.profileUrl}
				className="bg-white/30 inline-flex items-center text-white rounded px-2 pr-1 absolute right-0 bottom-0 m-8 gap-2 text-sm opacity-50 hover:opacity-100 transition-all"
				target="_blank"
				rel="noopener noreferrer"
			>
				Image of {backgroundImage.creator} from Unsplash
				<ArrowSquareOut weight="bold" />
			</a>

			<img
				className="isolate inset-0 absolute object-cover	w-full h-full -z-10"
				src={backgroundImage.imageUrl}
				alt=""
			/>
		</>
	)
}
