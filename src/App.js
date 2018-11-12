import React, { Component } from 'react';
import './App.css';
import ApiTable from './components/ApiTable.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApiTable api="https://jsonplaceholder.typicode.com/comments"/>
      </div>
    );
  }
}

export default App;
