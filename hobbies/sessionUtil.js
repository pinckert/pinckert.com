//   sessionUtil.js
//   access/manipulation routines for the sessions.js data structure
//

//
//  Take a yyyy-mm-dd value and convert to a link to the scoresheet for that date.
//
function linkify(date) {
    return `<a href=\"sheets\/${date.replace(/\//g, "_")}.jpg\">${date}</a>`;
}

// Get the team final score for a given match returns: [totalWins, totalLosses] from ['W: 2-1', 'L: 0-3' ...]
function sumMatches(teamMatch) {
    let totals = teamMatch.reduce((total, player) => {
        let results = res(player);
        return ([ total[0] + results[0], 
                  total[1] + results[1] ])}, [0,0] );
    return totals.join('-');
}

// Update player rank as indicated by most recent match
function determineRanks () {

}

// convert the stored format of a result to an array of [wins, losses]
function res(result) {
    return ([ parseInt(result.result[3]), parseInt(result.result[5]) ]);
}
