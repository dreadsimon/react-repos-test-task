import React from 'react';
import { Container } from '@mui/material';
import './App.css';
import { Header } from './shared';
import { Repos } from './repos';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Header />
        <Repos />
      </Container>
    </div>
  );
}

export default App;
