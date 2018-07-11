import React, { Component } from 'react';
import routes from './routes';
import Header from './components/Header/Header';
import './App.css';
import './reset.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {routes}
      </div>
    );
  }
}

export default App;
