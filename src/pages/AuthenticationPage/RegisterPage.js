import "./AuthenticationPage.css";
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div className="auth-div-container">
      <form className="auth-div">
        <div className="auth-title">
          <h1>House Of Fashion</h1>
          <h2>Sign Up</h2>
        </div>
        <div className="auth-label">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" required />
        </div>
        <div className="auth-label">
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" type="text" required />
        </div>
        <div className="auth-label">
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" type="text" required />
        </div>
        <div className="auth-label">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" required />
        </div>
        <button className="auth-button" type="submit">Sign Up</button>
        <p className="auth-option">Already have an account? <Link className="link" to={'/login'}>Sign in</Link></p>
      </form>
    </div>
  );
}

export default RegisterPage;
