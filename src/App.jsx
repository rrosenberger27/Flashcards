import { useState } from "react";
import "./App.css";
import Flashcard from "./components/flashcard";
import { shows } from "./shows";

function App() {
  const [showIndex, setShowIndex] = useState(0);
  const [onFront, setOnFront] = useState(true);
  const [displayHint, setDisplayHint] = useState(false);
  const [hardMode, setHardMode] = useState(true);
  const [prevIndexes, setPrevIndexes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const show = shows[showIndex];
  const [guess, setGuess] = useState("");
  const [guessState, setGuessState] = useState("");
  const [atStart, setAtStart] = useState(true);
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [nextIndexes, setNextIndexes] = useState([]);
  const [gotPoint, setGotPoint] = useState(false);
  let colorButton = true;
  
  const handleInput = (e) => {
    setGuess(e.target.value);
  };

  const handleGuess = () => {
    const formattedGuess = guess.toLowerCase().replaceAll(" ", "");
    const formattedAnswer = show.answer.toLowerCase().replaceAll(" ", "");
    if (formattedGuess === formattedAnswer && !gotPoint) {
      setGuessState("right");
      setOnFront(false);
      setLongestStreak(currentStreak + 1 > longestStreak ? currentStreak + 1 : longestStreak);
      setCurrentStreak(currentStreak + 1);
      setGotPoint(true);
    } else if (formattedGuess !== formattedAnswer){
      setGotPoint(false)
      setGuessState("wrong");
      setCurrentStreak(0);
    } else {
      setGuessState("right");
      setOnFront(false);
    }
  };

  const handleShuffle = () => {
    setPrevIndexes([]);
    setOnFront(true);
    setDisplayHint(false);
    let shuffled = [...Array(20).keys()].sort(() => Math.random() - 0.5);
    setTimeout( () => {
      setShowIndex(shuffled.pop());
      setNextIndexes(shuffled);
    }, 200)
  };

  const handleNextClick = () => {
    setOnFront(true);
    setDisplayHint(false);
    setGuessState("");
    setGotPoint(false);

    setTimeout(() => {
      const updatedPrevIndexes = [...prevIndexes, showIndex];
      setPrevIndexes(updatedPrevIndexes);
      if (updatedPrevIndexes.length === 20) {
        setGameOver(true);
      } else {
        const nextInd = nextIndexes.pop();
        setShowIndex(nextInd);
      }
    }, 200);
  
  };

  const handlePrevClick = () => {
    if (prevIndexes.length > 0) {
      setNextIndexes([...nextIndexes, showIndex])
      const newPrevIndexes = [...prevIndexes];
      const prevInd = newPrevIndexes.pop();
      setPrevIndexes(newPrevIndexes);
      setShowIndex(prevInd);
    } else {
      setAtStart(true);
    }
    setOnFront(true);
    setDisplayHint(false);
    setGuessState("");
  };
  const handleHardModeClick = () => setHardMode(!hardMode);
  const handleFlashcardClick = () => setOnFront(!onFront);
  const handleDisplayHint = () => setDisplayHint(!displayHint);
  const handleStartClick = () => {
    setGameOver(false);
    setAtStart(false);  
    handleShuffle();
  };

  setTimeout(() => {
    colorButton = false;
  }, 10);

  return (
    <div className="App">
      <div className="header">
        <button className="hard-mode-btn" onClick={handleHardModeClick}>
          {hardMode ? "change to easy" : "change to hard"}
        </button>
        {!atStart && !gameOver && 
        <button className="shuffle-btn" onClick={handleShuffle}>Shuffle and Restart</button>}
        <h1> TV TRIVIA! </h1>
        <h2> Test how many of these TV shows you know off of the image! </h2>
        <p> Number of cards: {shows.length.toLocaleString()} </p>
        <div className="streak-counter">
        <p> Current Streak: {currentStreak} </p>
        <p> Longest Streak: {longestStreak} </p>
        </div>
      </div>

      {!gameOver && !atStart && (
        <>
          <Flashcard
            image={hardMode ? show.images[1] : show.images[0]}
            category={show.category}
            answer={show.answer}
            onFront={onFront}
            displayHint={displayHint}
            handleFlashcardClick={handleFlashcardClick}
          />
          <div className="guess-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGuess();
              }}
            >
              <input
                className={guessState}
                type="text"
                value={guess}
                onChange={handleInput}
                placeholder="Enter Guess"
              />
              <button className={guessState}>
                submit
              </button>
            </form>
          </div>

          <div className="hint-container">
            <button className="hint-btn" onClick={handleDisplayHint}>
              {displayHint ? "Hide hint" : "Get Hint"}
            </button>
            {displayHint && <p className="hint"> {show.hint} </p>}
          </div>
          <div className="arrows">
            <button className="prev-arrow-btn" onClick={handlePrevClick}>
              {prevIndexes.length !== 0 ? "\u2190" : "start"}
            </button>
            <button className="next-arrow-btn" onClick={handleNextClick}>
              {nextIndexes.length !== 0 ? "\u2192" : "end" }
            </button>
          </div>
        </>
      )}

      {atStart &&  (
        <button className="restart-btn" onClick={handleStartClick}>
          Shuffle and Start!
        </button>
      )}

      {gameOver && (
        <button className="restart-btn" onClick={handleStartClick}>
          Shuffle and Restart!
        </button>
      )}
    </div>
  );
}

export default App;
