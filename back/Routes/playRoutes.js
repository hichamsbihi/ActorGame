const express = require("express");
const router = express.Router();
const {
    randomIntFromInterval
} = require('../utils/utils');

const {
    getMovieList,
    getActorsByMovieId,
    getActors,
} = require("../Services/tmdbService");

router.get("/", async (req, res) => {
    try {
        const questionBody = {
            actor: null,
            movie: null,
            hash: null
        }
        // define if we send a "correct question" or not
        // 1: a "yes" question
        // 2: a "no" question
        const rand = randomIntFromInterval(1, 2);
        const movieList = await getMovieList();

        // chose one random movie
        randomMovieIndex = randomIntFromInterval(0, movieList.length - 1);
        questionBody.movie = movieList[randomMovieIndex];

        const movieActorsList = await getActorsByMovieId(questionBody.movie.movieId);
        randomActorIndex = randomIntFromInterval(0, movieActorsList.length - 1);


        if (rand === 1) {
            // that means we send an actor of the same movie
            questionBody.actor = movieActorsList[randomActorIndex];

        }
        else {
            // that means that we're going to send the incorrect actor

            // actors are sorted by popularity
            const randomActorsList = await getActors();
            let randomActorIndex_1 = Math.floor(Math.random() * randomActorsList.length);

            while (movieActorsList.find(actor => actor.actorId === randomActorsList[randomActorIndex_1].actorId)) {
                randomActorIndex_1 = Math.floor(Math.random() * randomActorsList.length);
            }

            questionBody.actor = randomActorsList[randomActorIndex_1];

        }
        res.json(questionBody);

    } catch (err) {
        console.error("Error fetching question:", err);
        res.status(500).json({ error: "Failed to get question" });
    }
});



router.post("/", async (req, res) => {

    const { answer } = req.body;
    if (!['yes', 'no'].includes(answer)) {
        return res.status(400).json({ error: "Invalid request" });
    }
    try {
        res.json({ correct: isCorrect === answer });
    } catch (err) {
        console.error("Error verifying answer:", err);
        res.status(500).json({ error: "Failed to verify answer" });
    }
});


module.exports = router;