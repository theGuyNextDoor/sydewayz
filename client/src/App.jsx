import React from 'react';
import { UserProvider } from './UserManager';
import Home from './Home';

function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}

export default App;
