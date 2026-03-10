export const useInquiryStore = (() => {
	let state = {
		isOpen: false,
		product: null,
		listeners: [],
	};

	const notify = () => {
		state.listeners.forEach((listener) => listener(state));
	};

	return {
		subscribe: (listener) => {
			state.listeners.push(listener);
			return () => {
				state.listeners = state.listeners.filter((l) => l !== listener);
			};
		},
		getState: () => state,
		openInquiry: (product) => {
			state = { ...state, isOpen: true, product };
			notify();
		},
		closeInquiry: () => {
			state = { ...state, isOpen: false, product: null };
			notify();
		},
	};
})();
