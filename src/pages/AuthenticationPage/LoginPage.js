import "./AuthenticationPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://houseoffashion-weerawarnagayan.b4a.run/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { userId } = response.data;
      Cookies.set("user_id", userId);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="auth-div-container">
      <form className="auth-div" onSubmit={handleSubmit}>
        <div className="auth-title">
          <Link className="link" to='/'><h1>House Of Fashion</h1></Link>
          <h2>Sign In</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {errorMessage ? <p className="error">{errorMessage}</p> : null}
        <button className="auth-button" type="submit">
          Sign In
        </button>
        <p className="auth-option">
          Don't have an account?{" "}
          <Link className="link underline" to={"/register"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
