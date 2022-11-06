import React from 'react';
import { Header } from './shared';
import { Repos } from './repos';
import { AppWrapper } from './shared/components/StyledComponents';

function App() {
  return (
    <AppWrapper>
      <Header />
      <Repos />
    </AppWrapper>
  );
}

export default App;
