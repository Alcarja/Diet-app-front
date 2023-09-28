import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

const Nav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call your logout function to clear the JWT token or authentication state
    logout();
    navigate("/profile");
    window.location.reload();
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <Link to="/">
            <h1>Diet App</h1>
          </Link>
          <ul>
            <li>
              <Link to="/"> Calculator </Link>
            </li>

            {/* <li>
              <Link to="/calculator">Calculator</Link>
            </li> */}

            <li>
              <Link to="/diet">Diet</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <button className="nav-button" onClick={handleLogout}>
                {" "}
                Log out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
