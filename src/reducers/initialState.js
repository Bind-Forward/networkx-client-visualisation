import * as constants from '../constants/appConstants';

export default {
	articleId: 2,	
	graph: {
		name: "",
		nodes: [],
		edges: [],
		article: {
			id: "",
			name: "",
			url: "",
			sentences: [],
			content_selector: ""
		},
	},
	articles: [],	
	dictionaryTypes: [constants.DICTIONARY_TYPES.NOUN, constants.DICTIONARY_TYPES.VERB]
};