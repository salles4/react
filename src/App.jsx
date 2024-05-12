import { useState } from "react";
import "./App.css";
import correctSfx from "./assets/correct.mp3";
import wrongSfx from "./assets/wrong.mp3";

function App() {
  const [state, setState] = useState({
    num1: Math.ceil(Math.random() * 100),
    num2: Math.ceil(Math.random() * 100),
    response: "",
    score: 0,
  });

  const [scorer, setScorer] = useState(0);

  function randomize() {
    let ctr = 20;
    const inter = setInterval(() => {
      setState((currentstate) => {
        return {
          ...currentstate,
          num1: Math.floor(Math.random() * 100) + 1,
          num2: Math.floor(Math.random() * 100) + 1,
        };
      });
      ctr -= 1;
      if (ctr === 0) {
        clearInterval(inter);
      }
    }, 50);

    setState((currentstate) => {
      return {
        ...currentstate,
        num1: Math.floor(Math.random() * 100) + 1,
        num2: Math.floor(Math.random() * 100) + 1,
        response: "",
        score: state.score + 1,
      };
    });
  }
  function updateField(event) {
    setState({
      ...state,
      response: event.target.value,
    });
  }
  function entered() {
    if (state.response === ""){
      return
    }
    //if the answer is correct
    if (state.num1 + state.num2 === parseInt(state.response)) {
      randomize();
      setScorer(1);
      let winsfx = new Audio(correctSfx);
      winsfx.volume = 0.08;
      winsfx.play();
    }
    // if the answer is not correct
    else {
      setState({ ...state, response: "", score: state.score - 1 });
      setScorer(-1);
      let loseSfx = new Audio(wrongSfx);
      loseSfx.volume = 0.3;
      loseSfx.play();
    }
  }

  return (
    <>
      <div className="card">
        <div className="question">
          {state.num1} + {state.num2}
        </div>
        <input
          value={state.response}
          onKeyUp={(e) => (e.key === "Enter" ? entered() : "")}
          onChange={updateField}
          type="number"
        />
      </div>
      <button onClick={entered}>Enter</button>
      <div
        id="score"
        className={scorer === 1 ? "correct" : scorer === -1 ? "incorrect" : ""}
      >
        Score: {state.score}
      </div>
    </>
  );
}

export default App;
