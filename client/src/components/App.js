import React from 'react';

const App = () => {
  return (
    <div>
      <header>
        <h2>Hi there!</h2>
        <div>
          <a href='/auth/google'>
            Sign in with Google
          </a>
          &nbsp;
          <a href='/auth/facebook'>
            Sign in with Facebook
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
