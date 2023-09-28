import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";

const UpdateProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [age, setAge] = useState(user.age);
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [gender, setGender] = useState(user.gender);
  const [pActivity, setPActivity] = useState("1.6"); // Initialize with a default value
  const [dailyIntake, setDailyIntake] = useState(user.dailyIntake);

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    const calc = (input, gender) => {
      if (gender === "male") {
        const total =
          (66.47 +
            13.75 * input.weight +
            5.003 * input.height -
            6.755 * input.age) *
          input.pActivity;
        console.log(total);
        return total;
      } else {
        const total =
          (655.1 +
            9.563 * input.weight +
            1.85 * input.height -
            4.676 * input.age) *
          input.pActivity;
        console.log(total);
        return total;
      }
    };

    const newDailyIntake = calc({
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseFloat(age),
      pActivity: parseFloat(pActivity),
    });

    const updatedUser = {
      email: email,
      name: name,
      surname: surname,
      age: age,
      height: height,
      weight: weight,
      gender: gender,
      pActivity: pActivity,
      dailyIntake: newDailyIntake,
    };

    const response = await fetch(`${API_URL}/athlete/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const updatedUserData = await response.json();
      updateUser(updatedUserData); // Update the user data in context
      navigate("/profile");
    }
    console.log(response);
  };

  return (
    <>
      <div className="update-page-container">
        <div className="form">
          <form onSubmit={handleUpdateUser}>
            <h1> Update Profile</h1>

            <div className="input-box">
              {" "}
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            {/* <div className="input-box">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>{" "}
            </div> */}
            <div className="input-box">
              {" "}
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>{" "}
            </div>
            <div className="input-box">
              <input
                type="text"
                value={surname}
                placeholder="Surname"
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              ></input>{" "}
            </div>

            <div className="radio-buttons">
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  Male
                </label>
              </div>
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="input-box">
              {" "}
              <input
                type="number"
                value={age}
                placeholder="Age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              ></input>
            </div>

            <div className="input-box">
              {" "}
              <input
                type="number"
                value={height}
                placeholder="Height - cm"
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              ></input>
            </div>
            <div className="input-box">
              <input
                type="number"
                value={weight}
                placeholder="Weight - Kg"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              ></input>{" "}
            </div>

            <div className="radio-buttons">
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="1.2"
                    checked={pActivity === "1.2"}
                    onChange={() => setPActivity("1.2")}
                  />
                  Sedentary
                </label>
              </div>
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="1.4"
                    checked={pActivity === "1.4"}
                    onChange={() => setPActivity("1.4")}
                  />
                  Light Activity
                </label>
              </div>
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="1.6"
                    checked={pActivity === "1.6"}
                    onChange={() => setPActivity("1.6")}
                  />
                  Active
                </label>
              </div>
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="1.8"
                    checked={pActivity === "1.8"}
                    onChange={() => setPActivity("1.8")}
                  />
                  Very Active
                </label>
              </div>
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="1.9"
                    checked={pActivity === "1.9"}
                    onChange={() => setPActivity("1.9")}
                  />
                  Professional Athlete
                </label>
              </div>
            </div>

            <div className="buttons">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
          <h2 className="daily-intake">{Math.floor(dailyIntake)} Kcal/day</h2>
        </div>
      </div>
    </>
  );
};
export default UpdateProfile;
