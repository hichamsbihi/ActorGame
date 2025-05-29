import React, { useEffect, useState } from 'react';
import { useGetQuestionQuery, useSubmitAnswerMutation } from '../../services/QuestionApi';
import QuestionCard from '../QuestionCard/QuestionCard';
import './styles.scss';

/**
 * 
 * @returns wrapper of the card game 
 */
export const Game = () => {
  const { data: question, isLoading, isError, refetch } = useGetQuestionQuery();
  const [submitAnswer, { data: result, isSuccess, reset }] = useSubmitAnswerMutation();
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [scoreCounter, setScoreCounter] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = async (answer) => {
    if (!question?.hash) return;
    await submitAnswer({ questionHash: question.hash, answer });
    setShowResult(true);
  };

  const handleRestart = () => {
    setIsGameEnd(false);
    setScoreCounter(0);
    setShowResult(false);
    reset();      
    refetch();      
  };

  useEffect(() => {
    if (result?.correct) {
      refetch();
      setScoreCounter((prev) => prev + 1);
    } else if (result && !result.correct) {
      setIsGameEnd(true);
    }
  }, [result]);

  if (isLoading) return <p>Loading question...</p>;
  if (isError) return <p>Failed to load question.</p>;

  return (
    <div className='game-wrapper'>
      <QuestionCard
        imageUrl={question.movie.posterPath}
        movieName={question.movie.title}
        actorName={question.actor.name}
        actorImageUrl={question.actor.profilePath}
        onAnswer={handleAnswer}
        result={result}
        isGameEnd={isGameEnd} 
      />
      {showResult && result && !isGameEnd && (
        <p className="game-result">
          {result.correct ? '✅ Correct!' : '❌ Incorrect!'}
        </p>
      )}

      {isGameEnd && (
        <div className="game-restart">
          <p className="game-score">Score: {scoreCounter}</p>
          <button className="game-button" onClick={handleRestart}>Restart the game</button>
        </div>
      )}
    </div>
  );
};
