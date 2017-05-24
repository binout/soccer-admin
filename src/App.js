import React, { Component } from 'react';
import './App.css';

import Season from './Season.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Planning Equipe Soccer 5</h1>
            <h2>Administration</h2>
        </div>
        <Season/>
      </div>
    );
  }
}

export default App;
