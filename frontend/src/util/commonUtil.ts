export const formatDateTime = (raw?: string) => {
	if(!raw || raw.length < 14) {
		return raw ?? "";
	}

	const year = raw.substring(0, 4);
	const month = raw.substring(4, 6);
	const day = raw.substring(6, 8);

	return `${year}.${month}.${day}`;
};
