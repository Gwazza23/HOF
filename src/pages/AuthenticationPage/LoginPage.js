import "./AuthenticationPage.css";
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="auth-div-container">
      <form className="auth-div">
        <div className="auth-title">
          <h1>House Of Fashion</h1>
          <h2>Sign In</h2>
        </div>
        <div className="auth-label">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" required />
        </div>
        <div className="auth-label">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" required />
        </div>
        <button className="auth-button" type="submit">Sign In</button>
        <p className="auth-option">Don't have an account? <Link className="link" to={'/register'}>Sign Up</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;
