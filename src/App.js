import React, { Component } from 'react';
import './App.css';

import Season from './Season.js';
import Players from './Players.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Planning Equipe Soccer 5</h1>
            <h2>Administration</h2>
        </div>
        <Season/>
        <Players/>
      </div>
    );
  }
}

export default App;
