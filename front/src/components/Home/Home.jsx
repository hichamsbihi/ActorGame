import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="home__title">🎬 Welcome to my gate of Globe Groupe !</h1>
      <div className="home__buttons">
        <button className="home__button home__button--start" onClick={() => navigate("/game")}>
          Start The Game
        </button>
        <button className="home__button home__button--scoreboard" onClick={() => navigate("/scoreboard")}>
          📊 Show Scoreboard
        </button>
      </div>
    </div>
  );
};

export default Home;