import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./List"

class App extends Component {
  render() {
    return (
      <div className="App">
        <List>
          <h2>...</h2>
          <h2>...2</h2>
        </List>
      </div>
    );
  }
}

export default App;
