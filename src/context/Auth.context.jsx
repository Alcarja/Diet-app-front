import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  //You wrap your app with the AuthContextProvider so the whole thing has access to the value that you put into your AuthContext.Provider
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = async () => {
    const tokenInStorage = localStorage.getItem("authToken"); //This is going to grab the token that we set in LocalStorage
    console.log("Here is the token from the local storage", tokenInStorage);

    if (tokenInStorage) {
      try {
        //we make a call to the server and check if the token is valid
        const { data } = await axios.get(
          "http://localhost:5005/athlete/verify",
          {
            headers: { authorization: `Bearer ${tokenInStorage}` },
          }
        );
        console.log("from the context, here is the verify response", data);
        setUser(data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("error on the authenticate user function", err);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      //we will set the user back null, set isLoading to false, set isLoggedIn to false
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = (newUserData) => {
    // Update the user state with the new user data
    setUser(newUserData);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          hameds: "Hameds Message",
          authenticateUser,
          updateUser,
          user,
          isLoading,
          isLoggedIn,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContextWrapper, AuthContext };
