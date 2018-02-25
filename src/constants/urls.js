export const SCHEME = 'http';
export const DOMAIN = '192.168.1.128';
export const PORT = 3000;

export const ROOT_URL = `${SCHEME}://${DOMAIN}:${PORT}`;

export const GRAPHS_URL = `${ROOT_URL}/api/graphs`;
export const ARTICLES_URL = `${ROOT_URL}/api/articles`;
export const ARTICLE_URL = `${ROOT_URL}/api/article`;

export const MOCK_GRAPHS_URL = 'https://raw.githubusercontent.com/rcvjet15/networkx-client-visualisation/master/src/api/mockData/mockGraphData.json';
export const MOCK_ARTICLES_URL = 'https://raw.githubusercontent.com/rcvjet15/networkx-client-visualisation/master/src/api/mockData/mockArticlesData.json';