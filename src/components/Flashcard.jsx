import React from "react";
import '../Flashcard.css';

const Flashcard = (props) => {
    const isFlipped = !props.onFront;


    return (
        <div className="flashcard-container" onClick={props.handleFlashcardClick}>
            <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
                <div className={`flashcard flashcard-front ${props.category}`}>

                    <img className="flashcard-photo" src={props.image} alt={props.answer} />
                    <p className="category-text">
                        Category: {props.category}
                    </p>

                </div>

                <div className={`flashcard flashcard-back ${props.category}`}>

                    <p className="flashcard-answer">
                        {props.answer}
                    </p>
                    <p className="category-text">
                        Category: {props.category}
                    </p>
                    
                </div>

            </div>
        </div>
    )   
}

export default Flashcard;