export const SCHEME = 'http';
export const DOMAIN = '192.168.1.128';
export const PORT = 3000;

export function getRootUrl(){
	return `${SCHEME}://${DOMAIN}:${PORT}`
}