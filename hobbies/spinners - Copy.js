//-------------------------------------------------------------------------------
//
//	Manage pages in pool league 
//
function initializeDropDown() {
  allSessions = [currentSession].concat(archivedSessions);
  sessionsByName = {};

  const sessionsList = document.getElementById('session');
  for (let i = 0; i < allSessions.length; ++i) {
    const current = i == 0;
    const name = getSessionName(allSessions[i]);
    sessionsByName[name] = allSessions[i];
    const li = document.createElement('li');
    li.id = name;
    const a = li.appendChild(document.createElement('a'));
    a.href = '#';
    a.onclick = function() {
      sessionsList.querySelectorAll("li").forEach(function(element) {
        element.classList.remove('active');
      });
      document.getElementById('info').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      sessionSelected(name, current);
    };
    a.innerHTML = name + (current ? ' (Current)' : '');
    sessionsList.appendChild(li);
  }
  const info = document.createElement('li');
  const a = info.appendChild(document.createElement('a'));
  a.href = '#';
  a.onclick = function() {
    sessionsList.querySelectorAll("li").forEach(function(element) {
      element.classList.remove('active');
    });
    info.classList.add('active');
    document.getElementById('info').style.display = 'block';
    document.getElementById('content').style.display = 'none';
  };
  a.innerHTML = 'League Info';
  sessionsList.appendChild(info);

  sessionSelected(getSessionName(allSessions[0]), true);
}

function getSessionName(session) {
  return session.year + ' ' + session.term;
}

// Todo: Should return an array with all players...
function getGamesPlayed(player) {
	const matches = currentSession.matches;
	var matchesPlayed = 0;
	matches.forEach(function(match) {
		match.matches.forEach(function (playerMatch) {
			if (playerMatch.player == player){
				if (playerMatch.result != '') {
					matchesPlayed+=1;
				}
			}
		}); 
	});
	return matchesPlayed;
}

function populateTeamStatistics() {
  for (let i = 0; i < teamStatistics.length; ++i) {
    const apaNumber = teamStatistics[i][0];
    const name = teamStatistics[i][1];
    const skillLevel = teamStatistics[i][2];
    const matchesPlayed = getGamesPlayed(name.split(' ')[0]);

    const table = document.getElementById('team-stats');
    const row = table.insertRow();
    row.insertCell().innerHTML = apaNumber;
    row.insertCell().innerHTML = name;
    row.insertCell().innerHTML = skillLevel;
    row.insertCell().innerHTML = matchesPlayed;
  }
}

function sessionSelected(sessionName, isCurrent) {
  // Show tab as active
  document.getElementById(sessionName).classList.add('active');

  if (isCurrent) {
    // Upcoming matches visible
    document.getElementById('upcoming-section').style.display = 'block';

    // Past matches visible but collapsed
    document.getElementById('past').style.display = 'none';
    document.getElementById('past_matches_expand').style.display = 'inline-block';
    document.getElementById('past_matches_expand').innerHTML = 'expand_more';
    document.getElementById('team-stats-section').style.display = 'block';
  } else {
    // Upcoming matches not visible
    document.getElementById('upcoming-section').style.display = 'none';

    // Past matches visible and fixed expanded
    document.getElementById('past_matches_expand').style.display = 'none';
    document.getElementById('past').style.display = 'table';
    document.getElementById('team-stats-section').style.display = 'none';
  }
  const session = sessionsByName[sessionName];

  const upcomingTable = document.getElementById('upcoming');
  const oldUpcomingTableBody = upcomingTable.querySelector('tbody');
  const newUpcomingTableBody = document.createElement('tbody');

  const pastTable = document.getElementById('past');
  const oldPastTableBody = pastTable.querySelector('tbody');
  const newPastTableBody = document.createElement('tbody');

  const sheetIds = [];
  // Render each match / date as a separate row in either upcoming or past.
  for (let i = 0; i < session.matches.length; ++i) {
    const date = session.matches[i].date;
    const place = session.matches[i].place;
    const opponent = session.matches[i].opponent;
    const score = session.matches[i].score;
    const matches = session.matches[i].matches;
	const matchDate = new Date(date);
	var today = new Date();
	today.setHours(0,0,0,0);

    if (matchDate >= today) {  // upcoming
      const row = newUpcomingTableBody.insertRow();
      row.insertCell().innerHTML = new Date(date).toDateString();
      row.insertCell().innerHTML = place;
      row.insertCell().innerHTML = opponent ? opponent : 'Unknown';
      row.insertCell().innerHTML = matches.map(function(item) {
        return item.player;
      }).join(', ');
    } else {  // past
      const row = newPastTableBody.insertRow();
      row.insertCell().innerHTML = new Date(date).toDateString();
      row.insertCell().innerHTML = place;
      row.insertCell().innerHTML = opponent ? opponent : 'Unknown';
      row.insertCell().innerHTML = score ? score : 'Unknown';

      // See if there's match detailed information.
      let infoLink = undefined;
      if (matches.length > 0) {
        const tooltip = matches.map(function(item) {
          return item.player + ' (' + item.result + ')';
        }).join("\n");
        infoLink = '<a href="#" class="info" title="' + tooltip + '"><i class="material-icons">info</i></a>';
      } else {
        infoLink = '<a href="#" class="info disabled" title="No data"><i class="material-icons">info</i></a>';
      }

      // See if there's a sheet.
      const sheetId = date.replace(/\//g, '_');
      const sheetLink = '<a href="#" id="' + sheetId + '" class="info disabled" title="No sheet uploaded" target="_blank"><i class="material-icons">assignment</i></a>';
      sheetIds.push(sheetId);
      row.insertCell().innerHTML = infoLink + ' ' + sheetLink;
    }
  }

  // Update table body
  upcomingTable.replaceChild(newUpcomingTableBody, oldUpcomingTableBody);
  pastTable.replaceChild(newPastTableBody, oldPastTableBody);

  // Start updating sheet links
  sheetIds.forEach(function(sheetId) {
    updateSheetLink(sheetId);
  });
}

function toggleTable(tableId, linkId) {
  const table = document.getElementById(tableId);
  const link = document.getElementById(linkId);
  if (table.style.display == 'table') {
    table.style.display = 'none';
    link.innerHTML = 'expand_more';
  } else {
    table.style.display = 'table';
    link.innerHTML = 'expand_less';
  }
}

function updateSheetLink(sheetId) {
  const sheetUrl = '/hobbies/sheets/' + sheetId + '.jpg';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", sheetUrl, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const link = document.getElementById(sheetId);
        link.href = sheetUrl;
        link.classList.remove('disabled');
        link.title = 'See scoresheet';
      } else {
        // Sheet does not exist. Do nothing.
      }
    }
  };
  xhr.onerror = function (e) {
    // Sheet does not exist. Do nothing.
  };
  xhr.send(null);
}
//
// Some months may contain matches from two different
// sessions (e.g. matches in September may be from the
// Summer and Fall sessions) We can safely assume that
// no session extends across the year boundry. 
//
// Return the scheduled matches for the given year.
//
function getMatchesByDate(date) {
	const month = date.getMonth()+1; 
	const year = date.getFullYear();
	console.log("Getting records for month:" + month + "and year " + year );
	var matches = [];
	if (currentSession.year == year) {
		matches = matches.concat(currentSession.matches);
	}
	for (var index in archivedSessions) {
		if (archivedSessions[index].year == year) {
			matches = matches.concat(archivedSessions[index].matches);
		}
	}
	console.dir(matches);
	return matches;
}

function getPlayersBySession(sessionData, playerList) {
	for (var matchIndex in sessionData.matches)	{
		var matches = sessionData.matches[matchIndex].matches;
		for (var player in matches) {
			playerList.add(matches[player]['player']);
		}
	}
	return playerList;
}
//
// A little more difficult. Return everyone who was on the roster for a given month.
// The constraints:
//    Sessions (hence rosters) may change mid-month.
//    There is no guarantee a player has played in a month, but still needs to appear as 'on the team'
//  So the definition is "if a person has played during a session AND that session includes games for a particular 
//  month", that person is considered to be playing during that month.  
function getPlayersByMonth(year, month){
	var playerList = new Set();
	allSessions = archivedSessions.concat(currentSession);

	for (var sessionIndex in allSessions) {
		var session = allSessions[sessionIndex];
		if (session.year == year) {
			for (var matchIndex in session.matches) {
				var match = session.matches[matchIndex];
				var date = match.date.split('/');
				if (date[1] == month) {
					getPlayersBySession(session, playerList);
				}
			}
		}
	}
	return playerList;
}

function updatePlayers(date) {
	var playerNames = getPlayersByMonth(date.getFullYear(), date.getMonth()+1);
	var players = document.getElementById("players");
	var selected = players.value;
	while (players.firstChild) {
		players.removeChild(players.firstChild);
	}
	
	playerNames.forEach(function(name) {
		var node = document.createElement("option");
		node.text = name;
		players.add(node);
	});
	var node = document.createElement("option");
	node.text = "Team";
	players.add(node);
	
	if (selected == "") {
		selected = "Team";
	}
	players.value = selected;
}

function updateCalendarMonth(date, dayList)
{
	//
	//  Hack to reset background color...
	//
	for (var index in dayList){
		dayList[index].style.backgroundColor = "";
	}
	
	var month = date.getMonth()+1; 
	var day = date.getDay();
	const playerName = document.getElementById("players").value;
	const matchList = getMatchesByDate(date);
	for (var matchIndex in matchList) {
		const matchDate = matchList[matchIndex].date;
		const dateArray = matchDate.split('/');
		const matches = matchList[matchIndex].matches;
		const matchMonth =  parseInt(dateArray[1]);
		const matchDay   =  parseInt(dateArray[2]);
		var addedInfo  = ""
		console.log("Updating calender for player:" + playerName);
		if (matchMonth == month){
			matches.forEach(function(match) {

				if (match.player == playerName){
					console.log(playerName + " plays on " + matchDate);
					if (match.result != '') {
						added_info = document.createTextNode(match.result);
					} else {
						added_info = document.createTextNode(matchList[matchIndex].place);
					}
					dayList[matchDay].style.backgroundColor = "lime";
					dayList[matchDay].append(document.createElement("br"));
					dayList[matchDay].append(added_info);
				}
			});
		}
		if (matchMonth == month && playerName == "Team") {
			dayList[matchDay].style.backgroundColor = "lime";
			dayList[matchDay].append(document.createElement("br"));
			dayList[matchDay].append(document.createTextNode(matchList[matchIndex].place));
		}
	}
	updatePlayers(date);
}

function updateCalendarByPlayer()
{
	const playerName = document.getElementById("players").value;
	console.log("Updating to player: " + playerName);
	changeMonth(0, "pCal");
}

function initCalendar()
{
	console.dir(currentSession);
	var playerNames = new Set();

	cal = new calendar("player-calendar","pCal",updateCalendarMonth);
	updateCalendarByPlayer.cal = cal;  // hack to make the calendar available in the handler
	// populate drop-down
	var playerSelect = document.getElementById("players");
	updatePlayers(new Date());
	playerSelect.value = "Team"
	updateCalendarByPlayer();
}


