import React, { Component } from 'react';
import Navigation from './navigation/Navigation';
import GraphPage from './graph/GraphPage';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
				<Navigation />
				<GraphPage />
      </div>
    );
  }
}

export default App;
