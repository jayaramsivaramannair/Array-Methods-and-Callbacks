import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */


let final2014 = fifaData.filter(match => (match.Year === 2014) && (match.Stage === 'Final'));
console.log(final2014[0]);

console.log(final2014[0]["Home Team Name"]);
console.log(final2014[0]["Away Team Name"]);
console.log(final2014[0]["Home Team Goals"]);
console.log(final2014[0]["Away Team Goals"]);
console.log(final2014[0]['Win conditions'].split(" ")[0]);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(dataArray) {

    let finalsArray = fifaData.filter(match => (match.Stage === 'Final'));
    return finalsArray
};

console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(dataArray, cbFunc) {
    let years = cbFunc(dataArray).map(match => match.Year);
    return years;
};

console.log(getYears(fifaData, getFinals));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(dataArray, cbFunc) {
    let winners = cbFunc(dataArray).map(function(match) {
        if(match["Win conditions"] != "") {
            return match["Win conditions"].split(" ")[0];
        } else if(match["Home Team Goals"] > match["Away Team Goals"]) {
            return match["Home Team Name"];
        } else {
            return match["Away Team Name"];
        }
    })
    return winners;
};

console.log(getWinners(fifaData, getFinals));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(winnersFunc, yearsFunc) {
    let winners = winnersFunc(fifaData, getFinals);
    let years = yearsFunc(fifaData, getFinals);
    for(let i = 0; i < winners.length; i++) {
        console.log(`In ${years[i]}, ${winners[i]} won the world cup!`);
    }
};

getWinnersByYear(getWinners, getYears);

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */
function teamGoalsScoredByYear(dataArray, teamGoals) {
    let years = getYears(dataArray, getFinals);
    let yearlyMatches;
    let teamGoalsScored;
    let matches = [];
    for(let i = 0; i < years.length; i++) {
        yearlyMatches = fifaData.filter(match => match.Year === years[i]);
        teamGoalsScored = yearlyMatches.reduce((totalGoals, currentValue) => totalGoals + currentValue[teamGoals], 0);
        matches.push((teamGoalsScored / yearlyMatches.length));
    }
    return matches;
}


function getAverageGoals(fifaData) {
    let homeTeamAverageGoalsScored = teamGoalsScoredByYear(fifaData, "Home Team Goals");
    let awayTeamAverageGoalsScored = teamGoalsScoredByYear(fifaData, "Away Team Goals");
    let years = getYears(fifaData, getFinals);
    let averageGoalsByYear = [];
    for(let i = 0; i < years.length; i++) {
        averageGoalsByYear.push({
            "Year" : years[i],
            "Average Home Team Goals Per Match" : homeTeamAverageGoalsScored[i],
            "Average Away Team Goals Per Match" : awayTeamAverageGoalsScored[i],
        });
    }
    return averageGoalsByYear;
};


console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */
function getCountryWins(dataArray, teamInit) {
    let countryWins = dataArray.filter(match => match.Stage === "Final").filter(function(match) {
        if((match["Home Team Initials"] === teamInit) && match["Home Team Goals"] > match["Away Team Goals"]) {
            return match;
        } else if((match["Away Team Initials"] === teamInit) && match["Away Team Goals"] > match["Home Team Goals"]) {
            return match;
        } else if((match["Home Team Initials"] === teamInit) && match["Win conditions"].split(" ")[0].toLowerCase() === match["Home Team Name"].toLowerCase()) {
            return match;
        } else if ((match["Away Team Initials"] === teamInit) && match["Win conditions"].split(" ")[0].toLowerCase() === match["Away Team Name"].toLowerCase()) {
            return match;
        }
    })
    return countryWins.length;
}

console.log(getCountryWins(fifaData, "BRA"));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
