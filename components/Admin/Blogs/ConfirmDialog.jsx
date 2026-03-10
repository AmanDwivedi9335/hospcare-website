"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Action",
	message = "Are you sure you want to proceed?",
	confirmText = "Confirm",
	cancelText = "Cancel",
	type = "danger", // danger, warning, info
}) {
	if (!isOpen) return null;

	const typeStyles = {
		danger: {
			bg: "from-red-500 to-red-600",
			icon: "text-red-500",
			button: "bg-red-500 hover:bg-red-600",
		},
		warning: {
			bg: "from-yellow-500 to-yellow-600",
			icon: "text-yellow-500",
			button: "bg-yellow-500 hover:bg-yellow-600",
		},
		info: {
			bg: "from-blue-500 to-blue-600",
			icon: "text-blue-500",
			button: "bg-blue-500 hover:bg-blue-600",
		},
	};

	const currentStyle = typeStyles[type];

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
			>
				<motion.div
					className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.8, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div
						className={`bg-gradient-to-r ${currentStyle.bg} p-6 text-white relative`}
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
						>
							<X className="h-5 w-5" />
						</button>
						<div className="flex items-center">
							<AlertTriangle className="h-8 w-8 mr-3" />
							<h3 className="text-xl font-bold">{title}</h3>
						</div>
					</div>

					{/* Content */}
					<div className="p-6">
						<p className="text-gray-700 mb-6 leading-relaxed">{message}</p>

						<div className="flex gap-3 justify-end">
							<Button
								variant="outline"
								onClick={onClose}
								className="px-6 bg-transparent"
							>
								{cancelText}
							</Button>
							<Button
								onClick={onConfirm}
								className={`${currentStyle.button} text-white px-6`}
							>
								{confirmText}
							</Button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
