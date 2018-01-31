import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store} >
		<BrowserRouter routes={routes} />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

