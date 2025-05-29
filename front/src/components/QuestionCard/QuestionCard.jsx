import React from "react";
import "./style.scss";

const QuestionCard = ({ imageUrl, actorName, movieName, actorImageUrl, onAnswer, result, onRepeat }) => {

    const [isAnswered, setIsAnswered] = React.useState(false);

    const handleClick = (answer) => {
        onAnswer(answer);
        setIsAnswered(true);
    };
  return (
    <div className="card">
      <img src={imageUrl} alt={`${movieName} -- picture`} className="card__image" />
      <h2 className="card__title">{movieName}</h2>
      <img src={actorImageUrl} alt={`${actorName} -- picture`} className="card__actor-image" />

      <p className="card__question">
        Was <strong>{actorName}</strong> in this movie?
      </p>
      <div className="card__buttons">
        <button className="card__button card__button--yes" onClick={() => handleClick("yes")}>
          Yes
        </button>
        <button className="card__button card__button--no" onClick={() => handleClick("no")}>
          No
        </button>
      </div>
      {/* {result && (
        <p className="card__response">
          {result.correct ? '✅ Correct!' : '❌ Incorrect!'}
        </p>
      )} */}
    </div>
  );
};

export default QuestionCard;