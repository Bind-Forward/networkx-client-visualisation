import React from 'react';
import Header from './common/Header';
import MainRoutes from './MainRoutes.js';

import '../styles/App.css';
import '../styles/loader.css';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
				<Header />
				<MainRoutes />
      </div>
    );
  }
}

export default App;
