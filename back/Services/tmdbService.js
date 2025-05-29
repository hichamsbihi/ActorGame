const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASEURL = process.env.TMDB_BASEURL;
const TMDB_IMAGE_BASEURL = process.env.TMDB_IMAGE_BASEURL;

/**
 * 
 * @returns random list of movies from the popular ones
 */

const getMovieList = async () => {

    // choose a random page to fetch from popular films
    const page = Math.floor(Math.random() * 100) + 1;
    const { data } = await axios.get(`${TMDB_BASEURL}/movie/popular`, {
        params: { api_key: TMDB_API_KEY, page },
        headers: {
            'Authorization': 'Bearer ' + TMDB_API_KEY
        }
    });
    return data.results.map(movie => {
        return {
            "movieId": movie.id,
            "title": movie.title,
            "posterPath": `${TMDB_IMAGE_BASEURL}${movie.poster_path}`
        }
    });
}
/**
 * 
 * @param {*} movieId 
 * @returns actors by the suggested movie id 
 */
const getActorsByMovieId = async (movieId) => {

    const { data } = await axios.get(`${TMDB_BASEURL}/movie/${movieId}/credits`, {
        params: { api_key: TMDB_API_KEY },
        headers: {
            'Authorization': 'Bearer ' + TMDB_API_KEY
        }
    });

    return data.cast.map(cast => {
        return {
            actorId: cast.id,
            name: cast.name,
            popularity: cast.popularity,
            profilePath: TMDB_IMAGE_BASEURL + cast.profile_path
        }
    })
}
//  get random actors to respect randomness of 1/2 incorrect actor
const getActors = async () => {
    const actorsList = [];
    // call 3 pages of actor api
    for (var i = 1; i <= 3; i++) {
        const { data } = await axios.get(`${TMDB_BASEURL}/person/popular`, {
            params: { api_key: TMDB_API_KEY, page: i },
            headers: {
                'Authorization': 'Bearer ' + TMDB_API_KEY
            }
        });

        actorsList.push(...data.results.map(actor => {
            return {
                actorId: actor.id,
                name: actor.name,
                popularity: actor.popularity,
                profilePath: TMDB_IMAGE_BASEURL + actor.profile_path
            }
        }))
    }
    // sort actors to suggest the popular one and respect the hint 1 
    actorsList.sort((a, b) => b.popularity - a.popularity);

    return actorsList;
}

module.exports = {
    getMovieList,
    getActors,
    getActorsByMovieId
};