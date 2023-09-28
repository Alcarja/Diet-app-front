import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token from local storage (or cookies)
    localStorage.removeItem("authToken"); // The name of your token key

    // Redirect the user to the login page (or any other page)
    navigate("/login"); // Change '/login' to your desired destination
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
