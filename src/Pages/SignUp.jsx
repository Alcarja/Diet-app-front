import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [pActivity, setPActivity] = useState("1.2"); // Initialize with a default value
  const [dailyIntake] = useState(null);

  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const newAthlete = {
        email,
        password,
        name,
        surname,
        age,
        height,
        weight,
        gender,
        pActivity,
        dailyIntake,
      };

      const response = await fetch(`${API_URL}/athlete/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAthlete),
      });

      console.log("This is the response", response);
      Navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="form">
          <form onSubmit={handleSignup}>
            <h1>SignUp Form</h1>

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
            <div className="input-box">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>{" "}
            </div>
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
        </div>
      </div>
    </>
  );
};

export default SignUp;
