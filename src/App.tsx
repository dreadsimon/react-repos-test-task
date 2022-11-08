import React from 'react';
import { AppWrapper, Header } from './shared';
import { Repos } from './repos';

function App() {
  return (
    <AppWrapper>
      <Header />
      <Repos />
    </AppWrapper>
  );
}

export default App;
