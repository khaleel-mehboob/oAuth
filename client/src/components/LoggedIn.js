import React from 'react';

const LoggedIn = () => {
  return (
    <div>
      <h4>Congratulations, You are logged in!</h4>
      <ul>
        <li>
          <a href='/api/v1/auth/logout'>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default LoggedIn;