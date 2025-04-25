import {
	BowlFood,
	ClockCountdown,
	GearSix,
	ChartBar,
} from "@phosphor-icons/react"
import { useSettingsContext } from "../hooks/useSettingsContext"

import { ModalDialog } from "./ModalDialog"
import Options from "./Options"
import Insights from "./Insights"

export default function Settings() {
	const {
		timeState,
		showSettings,
		setShowSettings,
		showInsights,
		setShowInsights,
	} = useSettingsContext()

	return (
		<header className="fixed top-0 left-0 right-0 flex flex-wrap justify-between gap-8 font-medium p-8 z-20">
			<div className="inline-flex items-center gap-2">
				<img src="logo.svg" alt="Logo" width={20} /> TimeTap
			</div>

			<div className="flex gap-3">
				<button
					type="button"
					className="hidden md:inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1"
					title="Set your working time"
					onClick={() => setShowSettings(true)}
				>
					<ClockCountdown weight="fill" /> {timeState.workHours}h work time
				</button>

				<button
					type="button"
					className="hidden group relative md:inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1"
					title="Set your break time"
					onClick={() => setShowSettings(true)}
				>
					<BowlFood weight="fill" /> {timeState.breakHours}h break time
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1"
					title="View analytics"
					onClick={() => setShowInsights(true)}
				>
					<ChartBar weight="fill" /> Insights
				</button>

				<button
					type="button"
					className="group relative inline-flex items-center gap-2 transition-all hover:bg-white/30 rounded-lg px-2 py-1"
					title="All settings"
					onClick={() => setShowSettings(true)}
				>
					<GearSix weight="fill" /> Settings
				</button>
			</div>

			<ModalDialog isOpen={showSettings} onClose={() => setShowSettings(false)}>
				<Options />
			</ModalDialog>

			<ModalDialog
				isOpen={showInsights}
				onClose={() => setShowInsights(false)}
			>
				<Insights />
			</ModalDialog>
		</header>
	)
}

