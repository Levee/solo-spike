import React from 'react';
import logo from './logo.svg';
import './App.css';
import News from '../News/News';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Discord API Solo Spike
        </h2>
      </header>
      <News />
    </div>
  );
}

export default App;
