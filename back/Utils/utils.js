/**
 * 
 * @param {*} min min of random number
 * @param {*} max max of random number
 * @returns returns random number between gived random
 */
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


module.exports = {
    randomIntFromInterval
};
