import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import * as utility from './utility';
import { loadGraph, addDictionaryType, setLayout, selectCentralitySort } from './actions/graphActions';
import { loadArticles } from './actions/articleActions';
import initialState from './reducers/initialState';
import App from './components/App';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.css';
import './styles/styles.css';

const store = configureStore();
store.dispatch(loadArticles())
	.catch(error => {
		utility.displayAlertMessage(error, 'Error');
	});
store.dispatch(loadGraph(initialState.graph.articleId, initialState.dictionaryTypes))
	.catch(error => {
		utility.displayAlertMessage(error, 'Error');
	});

store.dispatch(addDictionaryType(initialState.dictionaryTypes));
store.dispatch(setLayout(initialState.layoutType));
store.dispatch(selectCentralitySort(initialState.defaultCentralitySort));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

