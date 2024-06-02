import { ArrowSquareOut } from "@phosphor-icons/react";
import { useMemo } from "react";
import { images } from "../constants/images";

export default function BackgroundImage() {
	const bgImage = useMemo(() => {
		return images[Math.floor(Math.random() * images.length)];
	}, []);

	return (
		<div>
			<a
				href={bgImage.profileUrl}
				className="bg-white/30 inline-flex items-center text-white rounded px-2 absolute right-0 bottom-0 m-4 gap-2 text-sm opacity-50 hover:opacity-100 transition-all"
				target="_blank"
				rel="noopener noreferrer"
			>
				<ArrowSquareOut weight="bold" /> Image of {bgImage.creator} from
				Unsplash
			</a>

			<img
				className="isolate inset-0 absolute object-cover	w-full h-full -z-10"
				src={bgImage.imageUrl}
				alt=""
			/>
		</div>
	);
}
