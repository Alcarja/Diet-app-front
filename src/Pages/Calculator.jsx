import { useState } from "react";

const Calculator = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [pActivity, setPActivity] = useState("1.2"); // Initialize with a default value
  const [dailyIntake, setDailyIntake] = useState(null);

  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");

  // CALCULATE THE TOTAL AMOUNT OF CALORIES
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

  //CALCULATE THE MACROS
  const getMacros = (totalCalories) => {
    const protein = (totalCalories * 0.35) / 4;
    const carbs = (totalCalories * 0.45) / 4;
    const fat = (totalCalories * 0.2) / 9;
    return { protein, carbs, fat };
  };

  // RESET THE CALCULATOR
  const resetCalculator = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
    setPActivity("1.2");
    setDailyIntake(null);
  };

  //HANDLE THE SUBMIT
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newEntry = {
        age,
        height,
        weight,
        gender,
        pActivity,
        dailyIntake,
      };
      console.log("This is the new Athlete", newEntry);

      const newDailyIntake = calc({
        weight: parseFloat(newEntry.weight),
        height: parseFloat(newEntry.height),
        age: parseFloat(newEntry.age),
        pActivity: parseFloat(newEntry.pActivity),
      });

      setDailyIntake(newDailyIntake);

      const macros = getMacros(newDailyIntake);
      setProtein(macros.protein);
      setCarbs(macros.carbs);
      setFats(macros.fat);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="calculator-container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1>Daily Intake Calculator</h1>
            <div className="radio-buttons">
              <div className="radio-button">
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />{" "}
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
                  />{" "}
                  Female
                </label>
              </div>
            </div>

            <div className="input-box">
              <input
                type="number"
                value={age}
                placeholder="Age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="number"
                value={height}
                placeholder="Height - cm"
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="input-box">
              <input
                type="number"
                value={weight}
                placeholder="Weight - Kg"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
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
              <button className="btn" type="submit">
                Submit
              </button>
              <button className="btn" type="button" onClick={resetCalculator}>
                Reset
              </button>
            </div>
          </form>
          <h2 className="daily-intake">{Math.floor(dailyIntake)} Kcal/day</h2>
          {dailyIntake !== null && (
            <div className="macros">
              <h2 className="daily-intake">Macronutrients:</h2>
              <p>Protein: {Math.floor(protein)} grams</p>
              <p>Carbs: {Math.floor(carbs)} grams</p>
              <p>Fats: {Math.floor(fats)} grams</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calculator;
