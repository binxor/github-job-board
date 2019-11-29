import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Container from './components/Container';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          GitHub Job Board
          </p>
        <div class="lightfont">
          These job postings are active on <a href="https://jobs.github.com">github.com</a>.  
        </div>
      </header>
      <Container></Container>
    </div>
  );
}

export default App;
