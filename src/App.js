import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Container from './components/Container';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-logo">
          GitHub Job Board
        </p>
      </header>
      <Container></Container>
      <div className="lightfont">
        These job postings are active on <a href="https://jobs.github.com">github.com</a>.  
      </div>
    </div>
  );
}

export default App;
