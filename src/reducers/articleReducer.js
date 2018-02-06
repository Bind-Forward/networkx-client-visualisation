import * as types from '../actions/actionTypes';
import initialState from './initialState';

const articleReducer = (state = initialState.articles, action) => {	
	switch (action.type) {		
		case types.LOAD_ARTICLES_SUCCESS:
			return action.articles;
		case types.LOAD_ARTICLE_SUCCESS:
			return [...state, 
				Object.assign({}, action.article)
				];
		default:
			return state;
	}
}

export default articleReducer;