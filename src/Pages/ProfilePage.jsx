import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [carbs, setCarbs] = useState("");
  const [proteins, setProtein] = useState("");
  const [fats, setFats] = useState("");

  // NAVIGATE TO THE LOGIN PAGE
  const goToLogin = () => {
    navigate("/login");
  };

  // NAVIGATE TO THE UPDATE USER PAGE
  const goToUpdate = () => {
    navigate("/profile/update");
  };

  // CALCULATE THE MACROS FOR THE USER
  const calculateMacros = (totalCalories) => {
    const protein = (totalCalories * 0.35) / 4;
    const carbs = (totalCalories * 0.45) / 4;
    const fat = (totalCalories * 0.2) / 9;
    return { protein, carbs, fat };
  };

  // GET THE MACROS FOR THE USER
  const getMacros = () => {
    const newMacros = calculateMacros(user.dailyIntake);
    setCarbs(newMacros.carbs);
    setProtein(newMacros.protein);
    setFats(newMacros.fat);
  };

  if (isLoading) {
    return (
      <div className="profile-page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-container">
        <h2 className="error-message">User not authenticated, go to login</h2>
        <button onClick={goToLogin} className="error-btn">
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="profile-page-container">
        <div className="profile-page-left">
          <h2>User Details</h2>
          <h3>
            Name: <span>{user.name}</span>
          </h3>
          <h3>
            Surname: <span>{user.surname || "N/A"}</span>{" "}
          </h3>
          <h3>
            Age: <span>{user.age || "N/A"}</span>{" "}
          </h3>
          <h3>
            Gender: <span>{user.gender || "N/A"}</span>{" "}
          </h3>
          <h3>
            Height: <span>{user.height || "N/A"}</span>{" "}
          </h3>
          <h3>
            Weight: <span>{user.weight || "N/A"}</span>{" "}
          </h3>
          <h3>
            Phisical Activity: <span>{user.pActivity || "N/A"}</span>{" "}
          </h3>

          <button onClick={goToUpdate} className="update-user-btn">
            Update User
          </button>
        </div>
        <div className="profile-page-right">
          <h2>Macros Breakdown</h2>
          <h3>
            Calorie Intake: <span>{Math.floor(user.dailyIntake) || "N/A"}</span>{" "}
            kcal
          </h3>
          <h3>
            Protein: <span>{Math.floor(proteins) || "N/A"}</span> g
          </h3>
          <h3>
            Carbs: <span>{Math.floor(carbs) || "N/A"}</span> g
          </h3>
          <h3>
            Fat: <span>{Math.floor(fats) || "N/A"}</span> g
          </h3>
          <button className="update-user-btn" onClick={getMacros}>
            Get the macros
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
