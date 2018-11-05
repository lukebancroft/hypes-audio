import React, { Component } from 'react';
import TopMenu from './components/TopMenu';
import ParametersTable from './components/ParametersTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopMenu />
        <ParametersTable />
      </div>
    );
  }
}

export default App;
