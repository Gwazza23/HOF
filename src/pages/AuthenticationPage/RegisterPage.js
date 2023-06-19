import "./AuthenticationPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function RegisterPage() {
  const navigate = useNavigate();
  const user_id = Cookies.get("user_id");
  console.log(user_id);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [response, setResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://houseoffashion-weerawarnagayan.b4a.run/users/register",
        {
          email,
          firstName,
          lastName,
          password,
        }
      );
      setErrorMessage(false);
      setResponse(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="auth-div-container">
      <form className="auth-div" onSubmit={handleSubmit}>
        <div className="auth-title">
          <h1>House Of Fashion</h1>
          <h2>Sign Up</h2>
        </div>
        <div className="auth-label">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="auth-label">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div className="auth-label">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        <div className="auth-label">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {response ? (
          <p className="response">
            Account successfully created! redirecting to login page...
          </p>
        ) : null}
        {errorMessage ? <p className="error">{errorMessage}</p> : null}
        <button className="auth-button" type="submit">
          Sign Up
        </button>
        <p className="auth-option">
          Already have an account?{" "}
          <Link className="link" to={"/login"}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
