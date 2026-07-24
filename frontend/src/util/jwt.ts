export const isTokenExpired = (token: string): boolean => {
	try {
		const payload = token.split(".")[1];
		const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
		const decoded = JSON.parse(atob(base64));
		return decoded.exp * 1000 < Date.now();
	} catch {
		return true;
	}
};
