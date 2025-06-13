import { useState } from 'react'
import './App.css'
import Flashcard from './components/flashcard'
import { shows } from './shows';


function App() {
  const [showIndex, setShowIndex] = useState(0);
  const [onFront, setOnFront] = useState(true);
  const [displayHint, setDisplayHint] = useState(false);
  const [hardMode, setHardMode] = useState(true);
  const [prevIndexes, setPrevIndexes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const show = shows[showIndex];

  const handleNextClick = () => {
    setOnFront(true);
    setDisplayHint(false);

    setTimeout(() => {
      const updatedPrevIndexes = [...prevIndexes, showIndex];
      setPrevIndexes(updatedPrevIndexes);
      if (updatedPrevIndexes.length === 20) {
        setGameOver(true);
      }
      else {
        let randInd = Math.floor(Math.random() * shows.length);
        while (updatedPrevIndexes.includes(randInd)) {
          randInd = Math.floor(Math.random() * shows.length);
        }
        setShowIndex(randInd);
    }
    }, 100);
    
  }


  const handlePrevClick = () => {
    if (prevIndexes.length > 0) {
      const newPrevIndexes = [...prevIndexes];
      const prevInd = newPrevIndexes.pop();
      setPrevIndexes(newPrevIndexes);
      setShowIndex(prevInd);
      setOnFront(true);
      setDisplayHint(false);
    } 
  }
  const handleHardModeClick = () => setHardMode(!hardMode); 
  const handleFlashcardClick = () => setOnFront(!onFront);
  const handleDisplayHint = () => setDisplayHint(!displayHint);
  const handleRestartClick = () => {
    setGameOver(false);
    setPrevIndexes([]);
    setShowIndex(Math.floor(Math.random() * shows.length));
  }

  return (
    <div className='App'>
      <div className='header'>
        <button className='hard-mode-btn' onClick={handleHardModeClick}>
            {hardMode ? "change to easy" : "change to hard"}
        </button>
        <h1> TV TRIVIA! </h1>
        <h2> Test how many of these TV shows you know off of the image! </h2>
        <p> Number of cards: {shows.length.toLocaleString()} </p>
      </div>

      {!gameOver && ( 
       <> 
      <Flashcard
      image={hardMode ? show.images[1] : show.images[0]}
      category={show.category}
      answer={show.answer}
      onFront={onFront}
      displayHint={displayHint}
      handleFlashcardClick={handleFlashcardClick}
      />
      <div className="hint-container">
                <button className="hint-btn" onClick={handleDisplayHint}>
                    {displayHint ?  "Hide hint" : "Get Hint"}
                </button>
                {displayHint && (
                    <p className="hint"> {show.hint} </p>
                )}
      </div>
      <div className='arrows'>
        <button className='prev-arrow-btn' onClick={handlePrevClick}>
          &#8592;
        </button>
        <button className='next-arrow-btn' onClick={handleNextClick}>
          &#8594;
        </button>
      </div> 
      </>
      )
}

    {gameOver && 
    <button className='restart-btn' onClick={handleRestartClick}>
      Restart!
    </button>
    }
    </div>
  )
}

export default App
