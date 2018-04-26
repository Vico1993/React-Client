import React, { Component } from 'react';
// Customs Component
import Table from './component/table/Table'
import './App.css';

const data = [{
  "firstname": "Victor",
  "Lastname": "Piolin"
}, {
  "firstname": "John",
  "Lastname": "Doe"
}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Peaches farmer in the USA</h1>
        </header>
        <Table 
            data={data}
          />
      </div>
    );
  }
}

export default App;
