import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GraphsPage from './graph/GraphsPage';
import AboutPage from './about/AboutPage';

const MainRoutes = () => (
	<main>
		<Switch>
			<Route exact path='/'>
				<Redirect to={{pathname: '/graphs'}} />
			</Route>
			<Route path='/graphs' component={GraphsPage} />
			<Route path='/about' component={AboutPage} />
		</Switch>
	</main>
);

export default MainRoutes;