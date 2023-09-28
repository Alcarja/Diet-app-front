import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Nav from "./Components/Nav";
import LoginPage from "./Pages/LoginPage";
import Calculator from "./Pages/Calculator";
import DietPage from "./Pages/DietPage";
import UpdateProfile from "./Pages/UpdateProfile";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Calculator />} />
        {/* <Route path="/calculator" element={<Calculator />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/diet" element={<DietPage />} />
      </Routes>
    </>
  );
}

export default App;
