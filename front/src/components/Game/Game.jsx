import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

import { useGetQuestionQuery, useSubmitAnswerMutation } from '../../services/QuestionApi';
import QuestionCard from '../QuestionCard/QuestionCard';

export const Game = () => {


 const navigate = useNavigate();

  const { data: question, isLoading, isError, refetch } = useGetQuestionQuery();
  const [submitAnswer, { data: result, isSuccess }] = useSubmitAnswerMutation();
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [scoreCounter, setScoreCounter] = useState(0);

  const handleAnswer = async (answer) => {
    if (!question?.hash) return;
    await submitAnswer({ questionHash: question.hash, answer });
    // update scoreboard
    // Optionally refetch the next question after a delay
    // setTimeout(() => refetch(), 2000);
  };

  const handleRestart = () => {
    setIsGameEnd(false);
    setScoreCounter(0);
    refetch();
  }

  useEffect(()=>{
    if(result && result.correct){
        // setIsCorrectAnswer(false);
        refetch();
        setScoreCounter(scoreCounter + 1);
    }
    else if(result && !result.correct) {
        setIsGameEnd(true);
        // display score
    }
        
  }, [result]);


  if (isLoading) return <p>Loading question...</p>;
  if (isError) return <p>Failed to load question.</p>;

  return (
    <div className='wrapper'>
      <QuestionCard
        imageUrl={question.movie.posterPath}
        movieName={question.movie.title}
        actorName={question.actor.name}
        actorImageUrl={question.actor.profilePath}
        onAnswer={handleAnswer}
        result={result}
      />
      {result && (
        <p>
          {result.correct ? '✅ Correct!' : '❌ Incorrect!'}
        </p>
      )}
      {isGameEnd && (
        <>
            <button className="game__button card__button--no" onClick={handleRestart}>Restart the game</button>
            <p>{scoreCounter}</p>
        </>
      )}
    </div>
  );
};