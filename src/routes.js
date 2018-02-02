import React from 'react';
import { Route, Switch } from 'react-router';
import App from './components/App';
import GraphPage from './components/App';

export default (
	<Switch>
		<Route exact path='/' component={App} />
		<Route exact path='/graph/:articleId' component={GraphPage} />
	</Switch>
);