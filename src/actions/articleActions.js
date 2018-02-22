import * as types from './actionTypes';
import articleApi from '../api/articleApi';
// import articleApi from '../api/mockArticleApi';

function loadArticlesSuccess(articles) {	
	return {
		type: types.LOAD_ARTICLES_SUCCESS,
		articles: articles
	};
}

function loadArticleSuccess(article) {
	return {
		type: types.LOAD_ARTICLE_SUCCESS,
		article
	};
}

export function loadArticles() {
	return dispatch => {
		return articleApi.getAllArticles().then(articles => {
			dispatch(loadArticlesSuccess(articles));
		}).catch(error => {
			throw error;
		});
	};
}

export function loadArticle(articleId) {
	return dispatch => {
		return articleApi.getArticle(articleId).then(article => {
			dispatch(loadArticleSuccess(article));
		}).catch(error => {
			throw(error);
		});
	};
}