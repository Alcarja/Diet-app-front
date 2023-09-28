import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";

function IsPrivate({ children }) {
  //grabbing information from the context (from the frig)
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  //If the page is still loading, then return a p tag until the data arrives
  if (isLoading) {
    return <p>Loading...</p>;
  }
  //If the data has arrived and the user is still not logged IN, then redirect to the login page
  if (!isLoggedIn) {
    navigate("/login");
  }

  // ELse... return the child component.
  //Everything was ok

  return <div>{children}</div>;
}

export default IsPrivate;

// import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/Auth.context";
// import { useNavigate } from "react-router-dom";

// const IsPrivate = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate(); // Use useNavigate hook

//   useEffect(() => {
//     // Check if there is a user in the context
//     // If not, navigate to the login page
//     if (!user) {
//       navigate("/login"); // Navigate in a useEffect
//     }
//   }, [user, navigate]); // Add navigate as a dependency

//   // Render the children only if the user is authenticated
//   return user ? children : null;
// };

// export default IsPrivate;
