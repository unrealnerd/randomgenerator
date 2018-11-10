function getRandomNumbers(count, limit) {
    var randomNumbersArray = [];
    var i = 0;

    do {
        var randomnumber = Math.floor(Math.random() * (limit));
        if (randomNumbersArray.indexOf(randomnumber) === -1) {
            i++;
            randomNumbersArray.push(randomnumber);
        }
    } while (i < count);

    return randomNumbersArray;
};

module.exports = {
    getRandom(count) {
        phrases = require('./data/phrases.json');
        var randomnumbers = getRandomNumbers(count, phrases.length);
        return randomnumbers.map(i => phrases[i]);
    },  
    
}