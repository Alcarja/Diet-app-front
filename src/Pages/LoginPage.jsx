import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(`${API_URL}/athlete/login`, {
        email,
        password,
      });
      console.log("Here is the login response", response);
      localStorage.setItem("authToken", response.data.token);
      navigate("/profile");
    } catch (err) {
      setErrorMessage(err.response.data.errorMessage);
      console.log(err);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="form">
          <form onSubmit={handleLogin}>
            <h1>Login page</h1>
            <div className="input-box">
              <input
                type="email"
                value={email}
                required
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="input-box">
              <input
                type="password"
                value={password}
                required
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>

            <button className="btn" type="submit">
              Login
            </button>
          </form>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
