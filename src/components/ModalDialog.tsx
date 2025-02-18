import { motion, AnimatePresence } from "motion/react"
import type { ReactNode } from "react"
import { createPortal } from "react-dom"

interface ModalDialogProps {
	children: ReactNode
	isOpen: boolean
	onClose: () => void
}

export function ModalDialog({ children, isOpen, onClose }: ModalDialogProps) {
	return createPortal(
		<AnimatePresence presenceAffectsLayout>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="absolute flex justify-center items-center inset-0 bg-slate-700/90 overflow-hidden p-4"
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							onClose()
						}
					}}
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className="items-center justify-center max-w-4xl p-8 bg-slate-100 rounded-xl flex flex-col gap-8 w-full shadow-2xl shadow-slate-900 h-fit max-h-full overflow-hidden"
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	)
}
