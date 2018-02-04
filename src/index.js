import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { loadGraph } from './actions/graphActions';
import { loadArticles, loadArticle } from './actions/articleActions';
import initialState from './reducers/initialState';
import App from './components/App';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const store = configureStore();
store.dispatch(loadGraph(initialState.articleId, initialState.dictionaryTypes));
store.dispatch(loadArticles());

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

