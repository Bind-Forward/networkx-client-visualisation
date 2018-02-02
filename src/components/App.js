import React from 'react';
import Header from './common/Header';
import MainRoutes from './MainRoutes.js';

import '../styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
				<Header />
				<MainRoutes />
      </div>
    );
  }
}

export default App;
