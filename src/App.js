import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Container from './components/Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Job Board
        </p>
        <Container></Container>
      </header>
    </div>
  );
}

export default App;
