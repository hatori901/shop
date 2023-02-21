export const classNames = (
	...classes: (string | undefined | null | false)[]
) => {
	return classes.filter(Boolean).join(" ");
};

export const debounce = (func: any, wait: number) => {
	let timerId: any;
	return (...args: any) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(() => {
			func(...args);
		}, wait);
	};
};