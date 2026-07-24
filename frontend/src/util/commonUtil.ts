export const formatDateTime = (raw?: string) => {
	if(!raw || raw.length < 14) {
		return raw ?? "";
	}

	const year = raw.substring(0, 4);
	const month = raw.substring(4, 6);
	const day = raw.substring(6, 8);
	const hour = raw.substring(8, 10);
	const minute = raw.substring(10, 12);
	const second = raw.substring(12, 14);

	return `${year}.${month}.${day}`;
};
