import React, { Component } from 'react';
// Customs Component
import Table from './component/table/Table'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Peaches farmer in the USA</h1>
        </header>
        <Table 
            url={'https://zrn2cbypo9.execute-api.us-west-2.amazonaws.com/TakeHome/fruit'} 
          />
      </div>
    );
  }
}

export default App;
