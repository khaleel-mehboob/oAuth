import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hi there!</h2>
        <a href='/auth/google'>
          Sign in with Google
        </a>
        <a hef='/auth/facebook'>
          Sign in with Facebook
        </a>
      </header>
    </div>
  );
}

export default App;
