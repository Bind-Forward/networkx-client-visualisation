import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import toastr from 'toastr';
import { loadGraph } from './actions/graphActions';
import { loadArticles } from './actions/articleActions';
import initialState from './reducers/initialState';
import App from './components/App';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.css';
import './styles/styles.css';
import '../node_modules/react-sigma/sigma/sigma.plugins.dragNodes.js'

const store = configureStore();
store.dispatch(loadArticles())
	.catch(error => {
		toastr.error(error, 'Error');
	});
store.dispatch(loadGraph(initialState.graph.articleId, initialState.dictionaryTypes))
	.catch(error => {
		toastr.error(error, 'Error');
	});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

