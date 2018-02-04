import * as types from './actionTypes';
import ArticleApi from '../api/ArticleApi';

function loadArticlesSuccess(articles) {
	return {
		type: types.LOAD_ARTICLES_SUCCESS,
		articles
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
		return ArticleApi.getAllArticles().then(articles => {
			dispatch(loadArticlesSuccess(articles));
		}).catch(error => {
			throw error;
		});
	};
}

export function loadArticle(articleId) {
	return dispatch => {
		return ArticleApi.getArticle(articleId).then(article => {
			dispatch(loadArticleSuccess(article));
		}).catch(error => {
			throw(error);
		});
	};
}