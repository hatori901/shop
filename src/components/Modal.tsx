import { useState, useEffect } from "react";
import { classNames } from "@/helpers/Formatter";

export default function Modal({
	children,
	title,
	show,
	onClose,
}: {
	children: React.ReactNode;
	title: string;
	show: boolean;
	onClose: () => void;
}) {
	const [showModal, setShowModal] = useState<any>(false);

	useEffect(() => {
		setShowModal(show);
	}, [show]);
	return (
		<div
			className={classNames(
				showModal ? "block" : "hidden",
				"fixed inset-0 z-10 overflow-y-auto"
			)}
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
				></div>
				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>
				<div
					className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					role="document"
				>
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3
									className="text-lg leading-6 font-medium text-gray-900"
									id="modal-title"
								>
									{title}
								</h3>
								<div className="mt-2">{children}</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={onClose}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
