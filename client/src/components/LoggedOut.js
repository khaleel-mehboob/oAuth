import React from 'react';

const LoggedOut = () => {
  return (
    <div>
      <h3>You need to Login</h3>
      <ul>
        <li>
          <a href='/auth/google'>Login using Google</a>
        </li>
        <li>
          <a href='/auth/facebook'>Login using Facebook</a>
        </li>
      </ul>
    </div>
  );
}

export default LoggedOut;