
// convert the stored format of a result to an array of [wins, losses]
function r(result) {
	return ([ parseInt(result.result[3]), parseInt(result.result[5]) ]);
}

// Get the team final score for a given match returns: [totalWins, totalLosses] from ['W: 2-1', 'L: 0-3' ...]
function sumMatches(teamMatch) {
	let totals = teamMatch.reduce((total, player) => {
			let results = r(player);
			return ([ total[0] + results[0], 
								total[1] + results[1] ])}, [0,0] );
	return totals.join('-');
}

	
	const currentSession = {
		year: 2019,
		term: 'Summer',
		matches: [
			{
				date: '2019/05/07',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: 'Harshit', result: 'W: 2-1', wins: 5, losses: 2, rank: 6, oppRank: 4, innings: 33, opponent: 'Sanna Haraginadoni'},
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 2, rank: 7, oppRank: 7, innings: 27, opponent: 'Simon Hodgson'},
					{player: 'Dean',    result: 'L: 0-2', wins: 1, losses: 3, rank: 4, oppRank: 4, innings: 17, opponent: 'Sandeep Dhull'},
					{player: 'Vishnu',  result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 4, innings: 38, opponent: 'Scott Gill'},
					{player: 'Peter',   result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 39, opponent: 'Trevor Boswell'}
				]
			},
			{
				date: '2019/05/14',
				place: 'Edgie\'s',
				opponent: 'Queens',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: 'Stacey',    result: 'W: 2-0', wins: 2, losses: 1, rank: 2, oppRank: 4, innings: 33, opponent: 'Lisa Nguyen'},
					{player: 'Vishnu',    result: 'L: 0-3', wins: 0, losses: 3, rank: 4, oppRank: 4, innings: 17, opponent: 'Lani Yoshimoto'},
					{player: 'Rohan',     result: 'L: 0-2', wins: 3, losses: 4, rank: 6, oppRank: 5, innings: 41, opponent: 'Christie Lee'},
					{player: 'Charishma', result: 'L: 1-2', wins: 1, losses: 4, rank: 3, oppRank: 4, innings: 47, opponent: 'Angela Nembhard'},
					{player: 'Harshit',   result: 'W: 2-1', wins: 5, losses: 2, rank: 6, oppRank: 4, innings: 28, opponent: 'Amy Chien'}
				]
			},
			{
				date: '2019/05/21',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/05/28',
				place: 'Lucky Shot',
				opponent: 'Rack\'em',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/06/04',
				place: 'Lucky Shot',
				opponent: 'Shenanigans',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/06/11',
				place: 'Lucky Shot',
				opponent: 'Leroy Merlin',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/06/18',
				place: 'Lucky Shot',
				opponent: 'Jive Chalkin\'',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/06/25',
				place: 'Lucky Shot',
				opponent: 'The Chalking Dead',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/07/02',
				place: 'Lucky Shot',
				opponent: 'Strong Button',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/07/09',
				place: 'Lucky Shot',
				opponent: 'Excuse to Drink',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/07/16',
				place: 'Edgie\'s',
				opponent: 'Pocket Stuffers',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/07/23',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/07/30',
				place: 'Edgies\'s',
				opponent: 'Queens',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
			{
				date: '2019/08/06',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				get score() {return sumMatches(this.matches)},
				matches: [
					{player: '',   result: '', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: ''},
					{player: '',      result: '', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: ''},
					{player: '', result: '', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: ''},
					{player: '',    result: '', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: ''},
					{player: '',     result: '', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: ''}
				]
			},
		]
	};


archivedSessions = [
	{
		year: 2017,
		term: 'Fall',
		matches: [
			{
				date: '2017/09/12',
				place: 'Edgies',
				opponent: 'All Rack No Balls',
				score: '9-6',
				matches: [
					{player: 'Juan',    result: 'W: 2-1', wins: 5, losses: 3, rank: 7, oppRank: 6, innings: 24, opponent: "Becky Simi"},
					{player: 'Harshit', result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 3, innings: 13, opponent: "Jennifer Liebthal"},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 32, opponent: "Carla Macias"},
					{player: 'Dean',    result: 'W: 2-1', wins: 2, losses: 1, rank: 3, oppRank: 3, innings: 17, opponent: "Yunami Konno"},
					{player: 'Yogesh',  result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 34, opponent: "Dana Koga"}
				]
			},
			{
				date: '2017/10/03',
				place: 'Lucky Shot',
				opponent: '9 to 8',
				score: '11-3',
				matches: [
					{player: 'Dean',      result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 4, innings: 24, opponent: "Talitha Bowers"},
					{player: 'Harshit',   result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 14, opponent: "Margaret Ausano"},
					{player: 'Karan',     result: 'W: 2-0', wins: 4, losses: 3, rank: 5, oppRank: 6, innings: 34, opponent: "Robert Orr"},
					{player: 'Vishnu',    result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 39, opponent: "Deceno Dacumos"},
					{player: 'Charishma', result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 4, innings: 13, opponent: "Hiram Pagaling"}
				]
			},			
			{
				date: '2017/10/10',
				place: 'Edgies',
				opponent: 'FPS',
				score: '7-5',
				matches: [
					{player: 'Dean',      result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 3, innings: 13, opponent: "Balaji Shekar"},
					{player: 'Karan',     result: 'L: 0-2', wins: 1, losses: 5, rank: 5, oppRank: 7, innings: 17, opponent: "Bharath Gondi"},
					{player: 'Karan',     result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 4, innings: 14, opponent: "Artur Davydov"},
					{player: 'Vishnu',    result: 'L: 0-2', wins: 2, losses: 3, rank: 5, oppRank: 4, innings: 27, opponent: "Cary Santiago"},
					{player: 'Charishma', result: 'W: 2-1', wins: 2, losses: 1, rank: 3, oppRank: 2, innings: 30, opponent: "Sumit Punjabi"}
				]
			},
			{
				date: '2017/10/17',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				score: '7-5',
				matches: [
					{player: 'Juan',      result: 'W: 2-1', wins: 5, losses: 4, rank: 7, oppRank: 6, innings: 22, opponent: "Simon Hodgson"},
					{player: 'Peter',     result: 'L: 0-3', wins: 0, losses: 2, rank: 3, oppRank: 3, innings: 17, opponent: "Aruna Mahadevan"},
					{player: 'Karan',     result: 'L: 0-2', wins: 2, losses: 3, rank: 5, oppRank: 5, innings: 19, opponent: "David Carner"},
					{player: 'Vishnu',    result: 'L: 0-2', wins: 1, losses: 4, rank: 5, oppRank: 5, innings: 29, opponent: "P.J. Petree"},
					{player: 'Charishma', result: 'W: 2-1', wins: 2, losses: 1, rank: 3, oppRank: 3, innings: 36, opponent: "Sandeep Dhull"}
				]
			},
			{
				date: '2017/10/24',
				place: 'Edgies',
				opponent: 'Leroy Merlin',
				score: '5-8',
				matches: [
					{player: 'Charishma', result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 3, innings: 22, opponent: "Barbara Elashoff"},
					{player: 'Juan', 	  result: 'L: 0-2', wins: 1, losses: 5, rank: 7, oppRank: 7, innings: 16, opponent: "Evan Deffley"},
					{player: 'Karan',     result: 'W: 2-0', wins: 4, losses: 2, rank: 5, oppRank: 5, innings: 25, opponent: "The Javelin Elashoff"},
					{player: 'Vishnu',    result: 'L: 0-3', wins: 0, losses: 4, rank: 5, oppRank: 4, innings: 13, opponent: "The Closer Johnson"},
					{player: 'Charishma', result: 'L: 0-3', wins: 0, losses: 2, rank: 3, oppRank: 3, innings: 19, opponent: "Ian McDougall"}
				]
			},
			{
				date: '2017/10/31',
				place: 'Lucky Shot',
				opponent: 'Jive Chalkin\'',
				score: '6-7',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 5, innings: 9,  opponent: "Shri Methar"},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 2, rank: 4, oppRank: 3, innings: 11, opponent: "Matt Turbin"},
					{player: 'Karan',   result: 'L: 0-2', wins: 2, losses: 4, rank: 5, oppRank: 5, innings: 24, opponent: "Bill Moore"},
					{player: 'Vishnu',  result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 5, innings: 24, opponent: "Angela Nembhard"},
					{player: 'Forfeit', result: 'L: 0-2'}
				]
			},
			{
				date: '2017/11/07',
				place: 'Cuetopia',
				opponent: 'Corner 8',
				score: '3-9',
				matches: [
					{player: 'Peter',   result: 'W: 2-0', wins: 2, losses: 2, rank: 3, oppRank: 6, innings: 11, opponent: "Walter Robertson"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 5, rank: 5, oppRank: 6, innings: 32, opponent: "Paul Jair"},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 2, rank: 4, oppRank: 3, innings: 17, opponent: "Konrad Hu"},
					{player: 'Harshit', result: 'L: 1-2', wins: 3, losses: 3, rank: 5, oppRank: 4, innings: 37, opponent: "Chandramoul Bhattacharya"},
					{player: 'Forfeit', result: 'L: 0-2'}
				]
			},
			{
				date: '2017/11/14',
				place: 'Lucky Shot',
				opponent: 'Excuse to Drink',
				score: '5-8',
				matches: [
					{player: 'Charishma', result: 'L: 0-3', wins: 0, losses: 4, rank: 3, oppRank: 5, innings: 26, opponent: "Kerry Prowse"},
					{player: 'Juan',      result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 3, innings: 29, opponent: "Jennifer Dulay"},
					{player: 'Yogesh',    result: 'W: 2-1', wins: 2, losses: 2, rank: 2, oppRank: 3, innings: 35, opponent: "Erin Collins"},
					{player: 'Harshit',   result: 'L: 0-2', wins: 1, losses: 5, rank: 5, oppRank: 6, innings: 27, opponent: "David Rodriguez"},
					{player: 'Karan',     result: 'L: 0-2', wins: 2, losses: 4, rank: 5, oppRank: 5, innings: 36, opponent: "Andy Peronto"}
				]
			},
			{
				date: '2017/11/21',
				place: 'Lucky Shot',
				opponent: 'Skullduggery',
				score: '9-5',
				matches: [
					{player: 'Charishma', result: 'L: 0-3', wins: 0, losses: 4, rank: 3, oppRank: 5, innings: 37, opponent: "Robert Avalos"},
					{player: 'Juan',      result: 'W: 2-0', wins: 5, losses: 2, rank: 7, oppRank: 6, innings: 18, opponent: "Tony Kachakji"},
					{player: 'Dean',      result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 28, opponent: "Lani Yoshimoto"},
					{player: 'Harshit',   result: 'W: 2-1', wins: 3, losses: 2, rank: 4, oppRank: 4, innings: 30, opponent: "Kathy Lam"},
					{player: 'Vishnu',    result: 'W: 2-1', wins: 4, losses: 2, rank: 5, oppRank: 4, innings: 26, opponent: "David Matthew"}
				]
			},
			{
				date: '2017/11/28',
				place: 'Lucky Shot',
				opponent: "Center Pocket",
				score: '8-7',
				matches: [
					{player: 'Charishma', result: 'L: 0-3', wins: 0, losses: 2, rank: 3, oppRank: 3, innings: 17, opponent: "Tim Okazaki"},
					{player: 'Yogesh',    result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 30, opponent: "Dylan Wright"},
					{player: 'Dean',      result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 4, innings: 21, opponent: "Samara Stone"},
					{player: 'Harshit',   result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 2, innings: 33, opponent: "Michael Phung"},
					{player: 'Vishnu',    result: 'L: 1-2', wins: 3, losses: 3, rank: 5, oppRank: 4, innings: 53, opponent: "David Wright"}
				]
			},
			{
				date: '2017/12/05',
				place: 'Lucky Shot',
				opponent: 'Mai Die Tuesday',
				score: '1-12',
				matches: [
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 2, rank: 3, oppRank: 2, innings: 20, opponent: "Kanika Smallwood"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 3, rank: 5, oppRank: 4, innings: 25, opponent: "Sunil Aluri"},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 4, rank: 4, oppRank: 5, innings: 15, opponent: "Vienlinh Tran"},
					{player: 'Harshit', result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 40, opponent: "Elizabeth Jeung"},
					{player: 'Dean',    result: 'L: 0-2', wins: 1, losses: 3, rank: 4, oppRank: 4, innings: 27, opponent: "Alex Popovici"}
				]
			},
			{
				date: '2017/12/12',
				place: 'Lucky Shot',
				opponent: "Shenanigans",
				score: '10-4',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 3, rank: 7, oppRank: 7, innings:  9, opponent: "Garreth King"},
					{player: 'Karan',   result: 'W: 2-1', wins: 4, losses: 4, rank: 5, oppRank: 6, innings: 44, opponent: "Alan Johnson"},
					{player: 'Dean',    result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 25, opponent: "Suyash Roongta"},
					{player: 'Harshit', result: 'W: 2-1', wins: 4, losses: 2, rank: 5, oppRank: 4, innings: 46, opponent: "Xiaotong Sun"},
					{player: 'Peter',   result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 43, opponent: "John Stokely"}
				]
			},
			{
				date: '2017/12/19',
				place: 'Lucky Shot',
				opponent: "The Chalking Dead",
				score: '7-7',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 6, innings: 24, opponent: "Christian Gils"},
					{player: 'Vishnu',  result: 'L: 0-3', wins: 0, losses: 4, rank: 5, oppRank: 6, innings: 33, opponent: "David Babbage"},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 29, opponent: "Paul Lucas"},
					{player: 'Harshit', result: 'W: 2-1', wins: 4, losses: 1, rank: 5, oppRank: 3, innings: 35, opponent: "Brad Parker"},
					{player: 'Peter',   result: 'L: 1-2', wins: 1, losses: 2, rank: 2, oppRank: 2, innings: 32, opponent: "Blair Baker"}
				]
			},

		]
    },   // Fall 2017
	{
		year: 2018,
		term: 'Spring',
		matches: [
			{
				date: '2018/01/09',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				score: '7-8',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 6, innings: 17, opponent: "Becky Simi"},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 45, opponent: "Carla Macias"},
					{player: 'Harshit', result: 'W: 2-1', wins: 4, losses: 2, rank: 5, oppRank: 4, innings: 38, opponent: "Jennifer Liebthal"},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 4, rank: 3, oppRank: 3, innings: 42, opponent: "Dana Koga"},
					{player: 'Yogesh',  result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 33, opponent: "Yunami Konno"}
				]
			},
			{
				date: '2018/01/16',
				place: 'Cuetopia',
				opponent: 'Rack\'em',
				score: '3-10',
				matches: [
					{player: 'Juan',    result: 'L: 0-2', wins: 2, losses: 2, rank: 7, oppRank: 4, innings: 11, opponent: "Sai Rao Gangaraju"},
					{player: 'Harshit', result: 'L: 0-2', wins: 1, losses: 4, rank: 5, oppRank: 5, innings: 21, opponent: "Antonio Lemos"},
					{player: 'Vishnu',  result: 'L: 0-3', wins: 0, losses: 5, rank: 5, oppRank: 6, innings: 20, opponent: "Paul Bryan"},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 2, rank: 4, oppRank: 4, innings: 48, opponent: "Mihail Chivari"},
					{player: 'Peter',   result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 42, opponent: "Tony Lemos"}
				]
			},
			{
				date: '2018/01/23',
				place: 'Lucky Shot',
				opponent: 'Leroy Merlin',
				score: '5-7',
				matches: [
					{player: 'Juan',    result: 'L: 0-2', wins: 2, losses: 4, rank: 7, oppRank: 6, innings: 18, opponent: "Sledgehammer Weber"},
					{player: 'Harshit', result: 'L: 0-3', wins: 0, losses: 4, rank: 5, oppRank: 5, innings: 20, opponent: "The Javelin Elashoff"},
					{player: 'Yogesh',  result: 'W: 2-0', wins: 2, losses: 1, rank: 2, oppRank: 3, innings: 42, opponent: "Chuck Busch"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 2, losses: 4, rank: 5, oppRank: 5, innings: 35, opponent: "The Closer Johnson"},
					{player: 'Dean',    result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 28, opponent: "Ian McDougall"}
				]
			},
			{
				date: '2018/01/30',
				place: 'Lucky Shot',
				opponent: 'Excuse to Drink',
				score: '9-3',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 3, innings: 22, opponent: "Erin Collins"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 2, losses: 4, rank: 5, oppRank: 5, innings: 31, opponent: "Andy Peronto"},
					{player: 'Harshit', result: 'W: 2-1', wins: 4, losses: 4, rank: 4, oppRank: 6, innings: 31, opponent: "David Rodriguez"},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 5, innings: 20, opponent: "Kerry Prowse"},
					{player: 'Yogesh',  result: 'W: 2-0', wins: 1, losses: 1, rank: 2, oppRank: 3, innings: 36, opponent: "Erin Collins"}
				]
			},
			{
				date: '2018/02/06',
				place: 'Edgie\'s',
				opponent: 'Skullduggery',
				score: '5-8',
				matches: [
					{player: 'Juan',    result: 'L: 0-2', wins: 2, losses: 4, rank: 7, oppRank: 6, innings: 17, opponent: "Tony Kachakji"},
					{player: 'Harshit', result: 'W: 2-1', wins: 4, losses: 3, rank: 5, oppRank: 5, innings: 41, opponent: "Robert Avalos"},
					{player: 'Peter',   result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 3, innings: 19, opponent: "Leslie Gaines"},
					{player: 'Dean',    result: 'L: 0-2', wins: 1, losses: 3, rank: 4, oppRank: 4, innings: 22, opponent: "Chandramoul Bhattacharya"},					
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 33, opponent: "David Matthew"}
				]
			},
			{
				date: '2018/02/13',
				place: 'Edgie\'s',
				opponent: 'Bay Strikers',
				score: '9-5',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 5, innings: 13, opponent: "Suresh Madham" },
					{player: 'Harshit', result: 'L: 1-2', wins: 3, losses: 5, rank: 5, oppRank: 6, innings: 31, opponent: "Santosh Sonalkar"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 4, rank: 5, oppRank: 5, innings: 31, opponent: "Vivek Vemula"},
					{player: 'Yogesh',  result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 3, innings: 20, opponent: "Viquaruddin Ahmed"},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 2, rank: 4, oppRank: 4, innings: 38, opponent: "Sundeep Mukherjee"}
				]
			},
			{
				date: '2018/02/20',
				place: 'Lucky Shot',
				opponent: '9 to 8',
				score: '8-6',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 4, innings: 18, opponent: "Hiram Pagaling"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 5, rank: 5, oppRank: 6, innings: 21, opponent: "Robert Orr"},
					{player: 'Harshit', result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 4, innings: 25, opponent: "Talitha Bowers"},
					{player: 'Yogesh',  result: 'W: 2-1', wins: 2, losses: 1, rank: 2, oppRank: 2, innings: 30, opponent: "Kimberly Engelhart"},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 4, rank: 4, oppRank: 5, innings: 19, opponent: "Mike Acks"}
				]
			},
			{
				date: '2018/02/27',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				score: '8-7',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 5, innings: 8,  opponent: "Jonathan Walker"},
					{player: 'Harshit', result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 31, opponent: "David Carner"},
					{player: 'Yogesh',  result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 3, innings: 14, opponent: "Sandeep Dhull"},
					{player: 'Yogesh',  result: 'L: 0-3', wins: 0, losses: 2, rank: 3, oppRank: 3, innings: 15, opponent: "Trevor Boswell"},
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 41, opponent: "P.J. Petree"}
				]
			},
			{
				date: '2018/03/06',
				place: 'Lucky Shot',
				opponent: 'Jive Chalkin\'',
				score: '5-6',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 5, innings: 20, opponent: "Bill Moore"},
					{player: 'Harshit', result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 5, innings: 16, opponent: "Manuel Delgado"},
					{player: 'Dean',    result: 'L: 0-2', wins: 1, losses: 4, rank: 4, oppRank: 5, innings: 42, opponent: "David Hoag"},
					{player: "Forfeit", result: 'L: 0-2'},
					{player: "Forfeit", result: 'L: 0-2'}					
				]
			},
			{
				date: '2018/03/13',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				score: '4-7',
				matches: [
					{player: 'Juan',    result: 'L: 0-2', wins: 2, losses: 4, rank: 7, oppRank: 6, innings: 21, opponent: "Robin Wong"},
					{player: 'Karan',   result: 'L: 0-2', wins: 1, losses: 4, rank: 5, oppRank: 5, innings: 46, opponent: "Peggy Brewster"},
					{player: 'Harshit', result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 4, innings: 35, opponent: "Elena Lippman"},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 5, innings: 28, opponent: "Carla Macias"},
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 28, opponent: "Dana Koga"}
				]
			},
			{
				date: '2018/03/20',
				place: 'Lucky Shot',
				opponent: 'Rack\'em',
				score: '10-3',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 4, innings: 15, opponent: "Mihail Chivari"},
					{player: 'Karan',   result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 6, innings: 21, opponent: "Paul Bryan"},
					{player: 'Harshit', result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 5, innings: 19, opponent: "Antonio Lemos"},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 4, innings: 28, opponent: "Sai Rao Gangaraju"},
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 21, opponent: "Tony Lemos"}
					]
			},
			{
				date: '2018/03/27',
				place: 'Edgie\'s',
				opponent: 'Leroy Merlin',
				score: '5-8',
				matches: [
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 27, opponent: "Ian McDougall"},
					{player: 'Karan',   result: 'L: 1-2', wins: 2, losses: 5, rank: 5, oppRank: 7, innings: 21, opponent: "Evan Deffley"},
					{player: 'Harshit', result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 5, innings: 21, opponent: "The Javelin Elashoff"},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 5, innings: 30, opponent: "The Closer Johnson"},
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 30, opponent: "Barbara Elashoff"}
				]
			},
			{
				date: '2018/04/03',
				place: 'Lucky Shot',
				opponent: 'Excuse to Drink',
				score: '6-8',
				matches: [
					{player: 'Karan',   result: 'L: 1-2', wins: 3, losses: 6, rank: 5, oppRank: 6, innings: 27, opponent: "David Rodriguez" },
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 2, rank: 2, oppRank: 2, innings: 45, opponent: "Scott Webb"},		
					{player: 'Harshit', result: 'L: 0-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 41, opponent: "Kerry Prowse"},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 22, opponent: "Jennifer Dulay"},
					{player: 'Vishnu',  result: 'W: 2-1', wins: 4, losses: 2, rank: 5, oppRank: 4, innings: 43, opponent: "John Straigis"}
				]
			},
			{
				date: '2018/04/10',
				place: 'Lucky Shot',
				opponent: 'Skullduggery',
				score:'Opp Forfeit',
				matches: [
					{player: 'Stacey',  result: 'W: 2-0', opponent: 'forfeit'},
					{player: 'Harshit', result: 'W: 2-0', opponent: 'forfeit'},
					{player: 'Dean',    result: 'W: 2-0', opponent: 'forfeit'},
					{player: 'Vishnu',  result: 'W: 2-0', opponent: 'forfeit'}
				]
			},
			{
				date: '2018/04/17',
				place: 'Lucky Shot',
				opponent: 'Bay Strikers',
				score: '2-9',
				matches: [
					{player: 'Harshit', result: 'W: 2-0', wins: 4, losses: 2, rank: 5, oppRank: 5, innings: 24, opponent: "Suresh Madham"},
					{player: 'Dean',    result: 'L: 0-2', wins: 2, losses: 2, rank: 4, oppRank: 2, innings: 24, opponent: "Viquaruddin Ahmed"},
					{player: 'Vishnu',  result: 'L: 0-3', wins: 0, losses: 4, rank: 5, oppRank: 5, innings: 14, opponent: "Kalyan Namburi"},
					{player: "Forfeit", result: 'L: 0-2'},
					{player: "Forfeit", result: 'L: 0-2'}		
				]
			},
			{
				date: '2018/04/24',
				place: 'Cuetopia',
				opponent: '9 to 8',
				score: '4-10',
				matches: [

					{player: 'Vishnu',  result: 'L: 0-3', wins: 0, losses: 4, rank: 5, oppRank: 5, innings: 20, opponent: "Mike Acks"},
					{player: 'Harshit', result: 'W: 2-1', wins: 4, losses: 4, rank: 5, oppRank: 6, innings: 27, opponent: "Robert Orr"},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 19, opponent: "Sabrina Gusky"},
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 32, opponent: "Hiram Pagaling"},
					{player: "Forfeit", result: 'L: 0-2'}						
				]
			},
		]
	},   // Sping 2018
	{
		year: 2018,
		term: 'Summer',
		matches: [
			{
				date: '2018/05/08',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				score: '7-7',
				matches: [
					{player: 'Harshit', result: 'W: 2-0', wins: 4, losses: 3, rank: 5, oppRank: 6, innings: 17, opponent: "Robin Wong"},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 2, losses: 3, rank: 5, oppRank: 4, innings: 37, opponent: "Elena Lippman"},
					{player: 'Rohan',   result: 'W: 3-0', wins: 5, losses: 0, rank: 4, oppRank: 5, innings: 22, opponent: "Carla Macias"},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 2, rank: 2, oppRank: 2, innings: 40, opponent: "Kiki Komgold"},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 3, rank: 3, oppRank: 4, innings: 31, opponent: "Dana Koga"}
				]
			},
			{
				date: '2018/05/15',
				place: 'Lucky Shot',
				opponent: 'Excuse to Drink',
				score: '6-8',
				matches: [
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 26, opponent: "David Rodriguez"},
					{player: 'Rohan',   result: 'L: 1-2', wins: 2, losses: 3, rank: 4, oppRank: 4, innings: 35, opponent: "John Straigis"},
					{player: 'Dean',    result: 'W: 2-1', wins: 4, losses: 1, rank: 4, oppRank: 2, innings: 50, opponent: "Scott Webb"},
					{player: 'Vishnu',  result: 'L: 0-3', wins: 0, losses: 4, rank: 5, oppRank: 5, innings: 24, opponent: "Andy Peronto"},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 5, rank: 2, oppRank: 5, innings: 52, opponent: "Kerry Prowse"}
				]
			},
			{
				date: '2018/05/22',
				place: 'Lucky Shot',
				opponent: 'Shenanigans',
				score: '3-11',
				matches: [
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 3, rank: 3, oppRank: 3, innings: 21, opponent: "Samuel Estrada"},
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 34, opponent: "John Stokely"},
					{player: 'Rohan',   result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 4, innings: 27, opponent: "Mathew Martinez"},
					{player: 'Harshit', result: 'L: 0-2', wins: 2, losses: 5, rank: 6, oppRank: 7, innings: 46, opponent: "Garreth King"},
					{player: 'Vishnu',  result: 'L: 0-3', wins: 0, losses: 4, rank: 5, oppRank: 5, innings: 24, opponent: "Qian Ding"}
				]
			},
			{
				date: '2018/05/29',
				place: 'Lucky Shot',
				opponent: '9 to 8',
				score: '8-5',
				matches: [
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 32, opponent: "Hiram Pagaling"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 2, losses: 4, rank: 5, oppRank: 4, innings: 28, opponent: "Kimberly Engelhart"},
					{player: 'Rohan',   result: 'W: 3-0', wins: 2, losses: 0, rank: 3, oppRank: 4, innings: 13, opponent: "Talitha Bowers"},
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 5, innings: 16, opponent: "Mike Acks"},
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 36, opponent: "Robert Orr"}
				]
			},
			{
				date: '2018/06/05',
				place: 'Cuetopia',
				opponent: 'Center Pocket',
				score: '7-7',
				matches: [
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 24, opponent: "Michael Phung" },
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 24, opponent: "Tim Okazaki"},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 4, innings: 28, opponent: "Chris Wells"},
					{player: 'Rohan',   result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 4, innings: 23, opponent: "David Wright"},
					{player: 'Harshit', result: 'W: 3-0', wins: 5, losses: 0, rank: 6, oppRank: 5, innings: 18, opponent: "Michael Marin"}
				]
			},
			{
				date: '2018/06/12',
				place: 'Lucky Shot',
				opponent: 'FPS',
				score: '4-9',
				matches: [
					{player: 'Harshit', result: 'L: 0-2', wins: 2, losses: 5, rank: 6, oppRank: 7, innings: 0, opponent: 'Venkata Bharath Gondi'},
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 5, rank: 4, oppRank: 6, innings: 0, opponent: 'Artur Davydov'},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 0, opponent: "Ralph-Christopher Cruz"},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 3, rank: 4, oppRank: 4, innings: 0, opponent: 'Balaji Shekar'},
					{player: 'Rohan',   result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 0, opponent: 'Ralph-Christopher Cruz'}
				]
			},
			{
				date: '2018/06/19',
				place: 'Edgie\'s',
				opponent: 'Jive Chalkin\'',
				score: '9-4',
				matches: [
					{player: 'Peter',  result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 42, opponent: "Kuriakose Kuruvilla"},
					{player: 'Stacey', result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 32, opponent: "Cathy Bonwick"},
					{player: 'Rohan',  result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 5, innings: 33, opponent: "Manuel Delgado"},
					{player: 'Dean',   result: 'L: 0-2', wins: 1, losses: 4, rank: 4, oppRank: 5, innings: 19, opponent: "Bill Moore"},
					{player: 'Vishnu', result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 4, innings: 33, opponent: "Terry Carleton"}
				]
			},
			{
				date: '2018/06/26',
				place: 'Edgie\'s',
				opponent: 'Bay Strikers',
				score: '7-7',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 6, innings: 17, opponent: "Santosh Sonalkar"},
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 5, rank: 2, oppRank: 5, innings: 34, opponent: "Vivek Vemula"},
					{player: 'Rohan',   result: 'W: 2-1', wins: 3, losses: 2, rank: 4, oppRank: 4, innings: 26, opponent: "Sundeep Mukherjee"},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 17, opponent: "Viquaruddin Ahmed"},
					{player: 'Vishnu',  result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 5, innings: 30, opponent: "Suresh Madham"}
				]
			},
			{
				date: '2018/07/03',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				score: '8-6',
				matches: [
					{player: 'Juan',    result: 'W: 2-1', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 25, opponent: "P.J. Petree"},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 46, opponent: "Sandeep Dhull"},
					{player: 'Vishnu',  result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 4, innings: 20, opponent: "Aruna Mahadevan"},
					{player: 'Harshit', result: 'L: 0-2', wins: 2, losses: 4, rank: 6, oppRank: 5, innings: 28, opponent: "David Carner"},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 27, opponent: "Trevor Boswell"},
				]
			},
			{
				date: '2018/07/10',
				place: 'Lucky Shot',
				opponent: 'Strong Button',
				score: '4-10',
				matches: [
					{player: 'Juan',    result: 'L: 1-2', wins: 4, losses: 2, rank: 7, oppRank: 4, innings: 21, opponent: "Sunil Aluri"},			
					{player: 'Harshit', result: 'L: 0-2', wins: 1, losses: 5, rank: 6, oppRank: 7, innings: 25, opponent: "Michael Fisher"},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 4, rank: 4, oppRank: 5, innings: 27, opponent: "Maricris Mendoza"},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 2, losses: 3, rank: 4, oppRank: 4, innings: 32, opponent: "Alex Popovici"},
					{player: 'Shiksha', result: 'W: 2-1', wins: 2, losses: 1, rank: 2, oppRank: 2, innings: 46, opponent: "Jennie Smith"}
				]
			},
			{
				date: '2018/07/17',
				place: 'Lucky Shot',
				opponent: 'Hard Strokers',
				score: '7-5',
				matches: [
					{player: 'Harshit', result: 'L: 0-2', wins: 3, losses: 5, rank: 6, oppRank: 6, innings: 27, opponent: "Daniel Ayotte"},
					{player: 'Rohan',   result: 'W: 2-0', wins: 4, losses: 2, rank: 5, oppRank: 6, innings: 41, opponent: "Geoff Yamaguchi"},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 5, innings: 34, opponent: "Jackee Vong"},
					{player: 'Shiksha', result: 'W: 2-1', wins: 2, losses: 2, rank: 2, oppRank: 3, innings: 45, opponent: "Sylvia Dang"},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 46, opponent: "Joshua Broberg"}
					]
			},
			{
				date: '2018/07/24',
				place: 'Edgie\'s',
				opponent: 'Leroy Merlin',
				score: '7-7',
				matches: [
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 20, opponent: "Parag Medhe"},
					{player: 'Dean',    result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 17, opponent: "Chuck Busch"},
					{player: 'Rohan',   result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 55, opponent: "The Closer Johnson"},
					{player: 'Harshit', result: 'L: 0-2', wins: 1, losses: 5, rank: 6, oppRank: 6, innings: 27, opponent: "Sledgehammer Weber"},
					{player: 'Vishnu',  result: 'W: 3-0', wins: 4, losses: 0, rank: 4, oppRank: 2, innings: 29, opponent: "Parag Medhe"}
				]
			},
			{
				date: '2018/07/31',
				place: 'Lucky Shot',
				opponent: 'The Chalking Dead',
				score: '8-7',
				matches: [
					{player: 'Peter',  result: 'W: 2-1', wins: 2, losses: 1, rank: 2, oppRank: 2, innings: 34, opponent: "Adrian Velicu"},
					{player: 'Stacey', result: 'W: 2-1', wins: 2, losses: 1, rank: 2, oppRank: 2, innings: 25, opponent: "Mark Prusinowski"},		
					{player: 'Vishnu', result: 'W: 2-1', wins: 4, losses: 1, rank: 4, oppRank: 2, innings: 37, opponent: "Mark Prusinowski"},
					{player: 'Rohan',  result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 34, opponent: "Yang Liu"},
					{player: 'Dean',   result: 'L: 1-2', wins: 3, losses: 2, rank: 4, oppRank: 2, innings: 38, opponent: "Blair Baker"}
				]
			},
			{
				date: '2018/08/07',
				place: 'Cuetopia',
				opponent: 'Rack\'em',
				score:'8-7',
				matches: [
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 36, opponent: "Nathan Bolger"},
					{player: 'Rohan',   result: 'L: 1-2', wins: 3, losses: 5, rank: 5, oppRank: 6, innings: 58, opponent: "Paul Bryan"},
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 20, opponent: "Tony Lemos"},
					{player: 'Shiksha', result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 3, innings: 17, opponent: "Andy Baron"},
					{player: 'Vishnu',  result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 4, innings: 17, opponent: "Mihail Chivari"}
				]
			},
		]
	},   // Summer 2018
	{
		year: 2018,
		term: 'Fall',
		matches: [
			{
				date: '2018/08/21',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				score: '5-8',
				matches: [
					{player: 'Harshit', result: 'W: 3-0', wins: 5, losses: 0, rank: 6, oppRank: 6, innings: 25, opponent: 'Simon Hodgson'},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 4, rank: 4, oppRank: 5, innings: 28, opponent: 'David Carner'},
					{player: 'Rohan',   result: 'W: 2-1', wins: 4, losses: 3, rank: 5, oppRank: 5, innings: 52, opponent: 'Scott Gill'},
					{player: 'Dean',    result: 'L: 0-2', wins: 1, losses: 3, rank: 4, oppRank: 4, innings: 24, opponent: 'Sandeep Dhull'},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 25, opponent: 'Trevor Boswell'}
				]
			},
			{
				date: '2018/08/28',
				place: 'Edgie\'s',
				opponent: 'Leroy Merlin',
				score: '6-8',
				matches: [
					{player: 'Harshit', result: 'L: 1-2', wins: 3, losses: 5, rank: 6, oppRank: 7, innings: 18, opponent: 'Evan Deffley'},
					{player: 'Juan',    result: 'W: 2-1', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 32, opponent: 'The Closer Johnson'},
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 26, opponent: 'Parag Medhe'},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 5, innings: 46, opponent: 'The Javelin Elashoff'},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 31, opponent: 'Chuck Busch'}
				]
			},
			{
				date: '2018/09/04',
				place: 'Lucky Shot',
				opponent: 'Rack N Roll',
				score: '8-4',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 5, innings: 27, opponent: 'Vivek Vemula'},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 77, opponent: 'Sundeep Mukherjee'},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 34, opponent: 'Viquaruddin Ahmed'},
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 1, rank: 6, oppRank: 5, innings: 30, opponent: 'Suresh Madham'},
					{player: 'Vishnu',  result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 6, innings: 24, opponent: 'Santosh Sonalkar'}
				]
			},
			{
				date: '2018/09/11',
				place: 'Lucky Shot',
				opponent: 'Strong Button',
				score: '10-4',
				matches: [
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 27, opponent: 'Jennie Smith'},
					{player: 'Juan',    result: 'W: 2-1', wins: 5, losses: 1, rank: 7, oppRank: 4, innings: 23, opponent: 'Alex Popovici'},
					{player: 'Rohan',   result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 5, innings: 28, opponent: 'Elizabeth Jeung'},
					{player: 'Harshit', result: 'W: 3-0', wins: 5, losses: 0, rank: 6, oppRank: 5, innings: 23, opponent: 'Maricris Mendoza'},
					{player: 'Shiksha', result: 'W: 2-0', wins: 2, losses: 1, rank: 2, oppRank: 3, innings: 27, opponent: 'Davin Kunovsky'}
				]
			},
			{
				date: '2018/09/18',
				place: 'Lucky Shot',
				opponent: 'Shenanigans',
				score: '6-7',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 6, innings: 31, opponent: 'Alan Johnson'},
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 48, opponent: 'Mathew Martinez'},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 31, opponent: 'Avinash Sharma'},
					{player: 'Rohan',   result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 5, innings: 27, opponent: 'Qian Ding'},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 49, opponent: 'Stephanie Ross'}
				]
			},
			{
				date: '2018/09/25',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				score: '8-5',
				matches: [
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 23, opponent: 'Becky Simi'},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 43, opponent: 'Elena Lippman'},
					{player: 'Shiksha', result: 'W: 2-1', wins: 2, losses: 1, rank: 2, oppRank: 2, innings: 46, opponent: 'Kiki Komgold'},
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 3, rank: 4, oppRank: 4, innings: 47, opponent: 'Dana Koga'},
					{player: 'Rohan',   result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 5, innings: 22, opponent: 'Carla Macias'}
				]
			},
			{
				date: '2018/10/02',
				place: 'Lucky Shot',
				opponent: '9 to 8',
				score: '6-8',
				matches: [
					{player: 'Peter',	result: 'L: 0-3', wins: 0, losses: 5, rank: 2, oppRank: 5, innings: 42, opponent: 'Deceno Dacumos'},
					{player: 'Juan', 	result: 'L: 1-2', wins: 4, losses: 2, rank: 7, oppRank: 4, innings: 35, opponent: 'Hiram Pagaling'},
					{player: 'Rohan', 	result: 'W: 2-0', wins: 4, losses: 3, rank: 5, oppRank: 6, innings: 24, opponent: 'Robert Orr'},
					{player: 'Stacey', 	result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings:  9, opponent: 'Peggy Horning'},
					{player: 'Harshit', result: 'W: 3-0', wins: 5, losses: 0, rank: 6, oppRank: 3, innings: 23, opponent: 'Chris Le'}
				]
			},
			{
				date: '2018/10/09',
				place: 'Lucky Shot',
				opponent: 'The Chalking Dead',
				score: '9-3',
				matches: [
					{player: 'Dean',    result: 'W: 3-0', wins: 4, losses: 0, rank: 4, oppRank: 2, innings: 27, opponent: "Adrian Velicu"},
					{player: 'Stacey',  result: 'W: 2-0', wins: 2, losses: 1, rank: 2, oppRank: 3, innings: 38, opponent: "Brad Parker"},
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 30, opponent: "Paul Lucas"},
					{player: 'Rohan',   result: 'L: 0-2', wins: 2, losses: 5, rank: 5, oppRank: 6, innings: 42, opponent: "David Babbage"},
					{player: 'Vishnu',  result: 'W: 2-1', wins: 4, losses: 1, rank: 4, oppRank: 2, innings: 48, opponent: "Blair Baker"}
				]
			},
			{
				date: '2018/10/16',
				place: 'Lucky Shot',
				opponent: 'Excuse to Drink',
				score: '6-8',
				matches: [
					{player: 'Juan',    result: 'W: 3-0', wins: 5, losses: 0, rank: 7, oppRank: 5, innings: 26, opponent: "Kerry Prowse"},
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 23, opponent: "Scott Webb"},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 4, rank: 4, oppRank: 6, innings: 52, opponent: "David Rodriguez"},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 4, innings: 36, opponent: "John Straigis"},
					{player: 'Harshit', result: 'L: 0-2', wins: 1, losses: 4, rank: 6, oppRank: 5, innings: 27, opponent: "Andy Peronto"},
				]
			},
			{
				date: '2018/10/23',
				place: 'Sunnyvale Elks Lodge',
				opponent: 'The Sunnyvale Elks',
				score: '8-5',
				matches: [
					{player: 'Rohan',   result: 'L: 0-2', wins: 2, losses: 4, rank: 5, oppRank: 5, innings: 25, opponent: "Brett Barker"},			
					{player: 'Harshit', result: 'W: 2-1', wins: 5, losses: 1, rank: 6, oppRank: 2, innings: 25, opponent: "James Ellis"},
					{player: 'Dean',    result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 31, opponent: "Glo Pina"},
					{player: 'Vishnu',  result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 6, innings: 25, opponent: "Juan Pina"},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 32, opponent: "AJ Barker"}
				]
			},
			{
				date: '2018/10/30',
				place: 'Lucky Shot',
				opponent: 'Rack\'em',
				score: '3-11',
				matches: [
					{player: 'Juan',    result: 'W: 2-1', wins: 5, losses: 1, rank: 7, oppRank: 4, innings: 26, opponent: "Tony Lemos"},
					{player: 'Rohan',   result: 'L: 0-2', wins: 2, losses: 4, rank: 5, oppRank: 5, innings: 44, opponent: "Antonio Lemos"},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 5, rank: 4, oppRank: 6, innings: 33, opponent: "Paul Bryan"},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 38, opponent: "Mihail Chivari"},
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 37, opponent: "Sai Rao Gangaraju"}
					]
			},
			{
				date: '2018/11/06',
				place: 'Edgie\'s',
				opponent: 'Jive Chalkin\'',
				score: '5-8',
				matches: [
					{player: 'Peter',  result: 'L: 0-3', wins: 0, losses: 5, rank: 2, oppRank: 5, innings: 31, opponent: "Manuel Delgado"},
					{player: 'Dean',   result: 'L: 0-2', wins: 1, losses: 5, rank: 4, oppRank: 6, innings: 32, opponent: "David Hoag"},
					{player: 'Rohan',  result: 'W: 2-1', wins: 4, losses: 3, rank: 5, oppRank: 5, innings: 42, opponent: "Terry Carleton"},
					{player: 'Juan',   result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 5, innings: 11, opponent: "Bill Moore"},
					{player: 'Stacey', result: 'L: 1-2', wins: 1, losses: 2, rank: 2, oppRank: 2, innings: 41, opponent: "Cathy Bonwick"}
				]
			},
			{
				date: '2018/11/13',
				place: 'Lucky Shot',
				opponent: 'Pocket Stuffers',
				score: '7-7',
				matches: [
					{player: 'Peter',  result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 28, opponent: 'Anson Nguyen'},
					{player: 'Stacey', result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: 'Karen Hong'},		
					{player: 'Rohan',  result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 5, innings: 27, opponent: 'Steven Le'},
					{player: 'Vishnu', result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 4, innings: 27, opponent: 'Jerry Tsai'},
					{player: 'Dean',   result: 'L: 1-2', wins: 1, losses: 5, rank: 4, oppRank: 7, innings: 6,  opponent: 'Deomark, Alpajora'}
				]
			},
			{
				date: '2018/11/20',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				score:'6-8',
				matches: [
					{player: 'Juan',    result: 'L: 1-2', wins: 4, losses: 5, rank: 7, oppRank: 7, innings: 21, opponent: 'Simon Hodgson'},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 45, opponent: 'Sanna Haraginadoni'},
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 26, opponent: 'P.J. Petree'},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 45, opponent: 'Jonathan Walker'},
					{player: 'Vishnu',  result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 4, innings: 22, opponent: 'Aruna Mahadevan'}
				]
			},
			{
				date: '2018/11/27',
				place: 'Lucky Shot',
				opponent: 'Leroy Merlin',
				score:'2-11',
				matches: [
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 5, rank: 2, oppRank: 5, innings: 43, opponent: 'The Closer Johnson'},
					{player: 'Rohan',   result: 'L: 0-2', wins: 2, losses: 2, rank: 5, oppRank: 3, innings: 21, opponent: 'Medhe Parag'},
					{player: 'Juan',    result: 'W: 2-1', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 29, opponent: 'The Javelin Elashoff'},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 5, rank: 4, oppRank: 7, innings: 15, opponent: 'Evan Deffley'},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 2, rank: 4, oppRank: 3, innings: 22, opponent: 'Medhe Parag'}
				]
			},
			{
				date: '2018/12/04',
				place: 'Edgie\'s',
				opponent: 'Rack N Roll',
				score:'4-11',
				matches: [
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 35, opponent: 'Kiran Kumar Jasti'},
					{player: 'Harshit', result: 'L: 1-2', wins: 4, losses: 4, rank: 6, oppRank: 5, innings: 42, opponent: 'Kalyan Namburi'},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 34, opponent: 'Viquaruddin Ahmed'},
					{player: 'Rohan',   result: 'L: 1-2', wins: 3, losses: 5, rank: 5, oppRank: 5, innings: 46, opponent: 'Santosh Sonalkar'},
					{player: 'Vishnu',  result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 5, innings: 25, opponent: 'Suresh Madham'}
				]
			},
			{
				date: '2018/12/11',
				place: 'Lucky Shot',
				opponent: 'Strong Button',
				score:'12-2',
				matches: [
					{player: 'Harshit', result: 'L: 0-2', wins: 2, losses: 5, rank: 6, oppRank: 7, innings: 16, opponent: 'Michael Fisher'},
					{player: 'Rohan',   result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 4, innings: 23, opponent: 'Alex Popovici'},
					{player: 'Stacey',  result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 31, opponent: 'Jennie Smith'},
					{player: 'Shiksha', result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 23, opponent: 'Davin Kunovsky'},
					{player: 'Vishnu',  result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 5, innings: 18, opponent: 'Vienlinh Tran'}
				]
			},
			{
				date: '2018/12/18',
				place: 'Lucky Shot',
				opponent: 'Shenanigans',
				score:'5-8',
				matches: [
					{player: 'Rohan',   result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 42, opponent: 'Qian Ding'},
					{player: 'Harshit', result: 'L: 0-2', wins: 3, losses: 5, rank: 6, oppRank: 6, innings: 45, opponent: 'Alan Johnson'},
					{player: 'Peter',   result: 'W: 2-0', wins: 2, losses: 2, rank: 2, oppRank: 4, innings: 29, opponent: 'John Stokely'},
					{player: 'Rohan',   result: 'L: 1-2', wins: 3, losses: 4, rank: 5, oppRank: 5, innings: 41, opponent: 'Qian Ding'},
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 2, rank: 4, oppRank: 3, innings: 22, opponent: 'Stephanie Ross'}
				]
			},
		]
	},    // Fall 2018
	{
		year: 2019,
		term: 'Spring',
		matches: [
			{
				date: '2019/01/08',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				score: '11-3',
				matches: [
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 2, rank: 6, oppRank: 6, innings: 24, opponent: 'Robin Wong'},
					{player: 'Juan',    result: 'W: 2-1', wins: 5, losses: 2, rank: 7, oppRank: 5, innings: 22, opponent: 'Peggy Brewster'},
					{player: 'Rohan',   result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 3, innings: 19, opponent: 'Dana Koga'},
					{player: 'Stacey',  result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 38, opponent: 'Yunami Konno'},
					{player: 'Shiksha', result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 2, innings: 22, opponent: 'Kiki Komgold'}
				]
			},
			{
				date: '2019/01/15',
				place: 'Lucky Shot',
				opponent: 'Shenanigans',
				score: '7-7',
				matches: [
					{player: 'Harshit', result: 'L: 1-2', wins: 4, losses: 4, rank: 6, oppRank: 5, innings: 43, opponent: 'Qian Ding'},
					{player: 'Rohan',   result: 'W: 2-0', wins: 3, losses: 3, rank: 5, oppRank: 6, innings: 38, opponent: 'Alan Johnson'},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 39, opponent: 'Mathew Martinez'},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 3, rank: 4, oppRank: 4, innings: 33, opponent: 'John Stokely'},
					{player: 'Peter',   result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 3, innings: 12, opponent: 'Aeillyne Yburan'}
				]
			},
			{
				date: '2019/01/22',
				place: 'Lucky Shot',
				opponent: 'Strong Button',
				score: '8-5',
				matches: [
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 27, opponent: 'Jennie Smith'},
					{player: 'Shiksha', result: 'W: 2-0', wins: 2, losses: 1, rank: 2, oppRank: 3, innings: 28, opponent: 'Chris Hogan'},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 2, rank: 4, oppRank: 5, innings: 26, opponent: 'Vienlinh Tran'},
					{player: 'Vishnu',  result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 4, innings: 17, opponent: 'Dan Shaw'},
					{player: 'Dean',    result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 49, opponent: 'Elizabeth Jeung'}
				]
			},
			{
				date: '2019/01/29',
				place: 'Lucky Shot',
				opponent: '9 to 8',
				score: '7-7',
				matches: [
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 36, opponent: 'Peggy Horning'},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 35, opponent: 'Chris Le'},
					{player: 'Juan',    result: 'L: 1-2', wins: 4, losses: 4, rank: 7, oppRank: 6, innings: 38, opponent: 'Ronald Varela'},
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 3, rank: 6, oppRank: 6, innings: 39, opponent: 'Robert Orr'},
					{player: 'Vishnu',  result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 5, innings: 17, opponent: 'Mike Acks'}
				]
			},
			{
				date: '2019/02/05',
				place: 'Edgie\'s',
				opponent: 'Queens',
				score: '8-4',
				matches: [
					{player: 'Dean',    result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 23, opponent: 'Leslie Gaines'},
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 1, rank: 6, oppRank: 5, innings: 36, opponent: 'Angela Nembhard'},
					{player: 'Vishnu',  result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 4, innings: 22, opponent: 'Lani Yoshimoto'},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 45, opponent: 'Kathy Lam'},
					{player: 'Forfeit', result: 'L: 0-2', wins: 0, losses: 0, rank: 0, oppRank: 0, innings: 0, opponent: ''}
				]
			},
			{
				date: '2019/02/12',
				place: 'Lucky Shot',
				opponent: 'Leroy Merlin',
				score: '3-11',
				matches: [
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 30, opponent: 'Barbara Elashoff'},
					{player: 'Peter',   result: 'W: 2-1', wins: 2, losses: 2, rank: 2, oppRank: 3, innings: 35, opponent: 'Chuck Busch'},
					{player: 'Harshit', result: 'L: 1-2', wins: 4, losses: 4, rank: 6, oppRank: 5, innings: 41, opponent: 'The Javelin Elashoff'},
					{player: 'Dean',    result: 'L: 0-3', wins: 0, losses: 5, rank: 4, oppRank: 7, innings: 15, opponent: 'Evan Deffley'},
					{player: 'Vishnu',  result: 'L: 0-2', wins: 1, losses: 4, rank: 4, oppRank: 5, innings: 38, opponent: 'The Closer Johnson'}
				]
			},
			{
				date: '2019/02/19',
				place: 'Sunnyvale Elks Lodge',
				opponent: 'The Sunnyvale Elks',
				score: '10-5',
				matches: [
					{player: 'Peter',   result: 'W: 2-1', wins: 2, losses: 1, rank: 2, oppRank: 2, innings: 31, opponent: 'Christina Mehl'},
					{player: 'Rohan',   result: 'W: 2-1', wins: 4, losses: 4, rank: 5, oppRank: 6, innings: 24, opponent: 'Juan Pina'},
					{player: 'Dean',    result: 'W: 2-1', wins: 4, losses: 2, rank: 4, oppRank: 2, innings: 57, opponent: 'Tracy Kavanau-Pelley'},
					{player: 'Harshit', result: 'W: 3-0', wins: 6, losses: 2, rank: 6, oppRank: 2, innings: 26, opponent: 'Glo Pina'},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 19, opponent: 'Brett Barker'}
				]
			},
			{
				date: '2019/02/26',
				place: 'Lucky Shot',
				opponent: 'Excuse to Drink',
				score: '9-4',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 5, innings: 14, opponent: 'Andy Peronto'},
					{player: 'Vishnu',  result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 23, opponent: 'Mandi Straigis'},
					{player: 'Rohan',   result: 'W: 3-0', wins: 4, losses: 0, rank: 5, oppRank: 2, innings: 34, opponent: 'Jennifer Dulay'},
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 6, rank: 2, oppRank: 6, innings: 36, opponent: 'David Rodriguez'},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 4, innings: 31, opponent: 'John Straigis'}
				]
			},
			{
				date: '2019/03/05',
				place: 'Lucky Shot',
				opponent: 'The Chalking Dead',
				score: '7-4',
				matches: [
					{player: 'Stacey',  result: 'W: 3-0', wins: 2, losses: 0, rank: 2, oppRank: 3, innings: 22, opponent: 'Ryan Parker'},
					{player: 'Harshit', result: 'L: 0-2', wins: 1, losses: 5, rank: 6, oppRank: 6, innings: 31, opponent: 'David Babbage'},
					{player: 'Dean',    result: 'W: 2-0', wins: 3, losses: 1, rank: 4, oppRank: 6, innings: 30, opponent: 'Christian Gils'},
					{player: 'Rohan',   result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 5, innings: 36, opponent: 'Paul Lucas'},
					{player: 'Forfeit', result: 'L: 0-2', wins: 0, losses: 0, rank: 0, oppRank: 0, innings: 0, opponent: 'None'}
				]
			},
			{
				date: '2019/03/12',
				place: 'Lucky Shot',
				opponent: 'Now What?',
				score: '5-8',
				matches: [
					{player: 'Harshit', result: 'L: 0-2', wins: 3, losses: 3, rank: 6, oppRank: 4, innings: 56, opponent: 'Sanna Haraginadoni'},
					{player: 'Rohan',   result: 'W: 2-1', wins: 4, losses: 2, rank: 5, oppRank: 4, innings: 33, opponent: 'Sandeep Dhull'},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 2, losses: 3, rank: 4, oppRank: 4, innings: 40, opponent: 'Aruna Mahadevan'},
					{player: 'Shiksha', result: 'W: 2-0', wins: 2, losses: 2, rank: 2, oppRank: 4, innings: 22, opponent: 'Scott Gill'},
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 35, opponent: 'Jonathan Walker'}
				]
			},
			{
				date: '2019/03/19',
				place: 'Lucky Shot',
				opponent: 'Pocket Stuffers',
				score: '5-8',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 6, innings: 16, opponent: 'Daniel Ayotte'},
					{player: 'Rohan',   result: 'W: 2-1', wins: 4, losses: 3, rank: 5, oppRank: 5, innings: 37, opponent: 'Anson Nguyen'},
					{player: 'Vishnu',  result: 'L: 1-2', wins: 2, losses: 4, rank: 4, oppRank: 5, innings: 25, opponent: 'Ash Sadasivan'},
					{player: 'Dean',    result: 'L: 0-2', wins: 1, losses: 3, rank: 4, oppRank: 4, innings: 35, opponent: 'Jerry Tsai'},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 30, opponent: 'Karen Hong'}
					]
			},
			{
				date: '2019/03/26',
				place: 'Edgie\'s',
				opponent: 'Jive Chalkin\'',
				score: '7-6',
				matches: [
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 2, rank: 2, oppRank: 2, innings: 18, opponent: 'Varun Dhital'},
					{player: 'Peter',   result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 47, opponent: 'Kuriakose Kuruvilla'},
					{player: 'Rohan',   result: 'W: 2-0', wins: 4, losses: 1, rank: 5, oppRank: 6, innings: 21, opponent: 'David Hoag'},
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 1, rank: 6, oppRank: 4, innings: 37, opponent: 'Matthew Turbin'},
					{player: 'Dean',    result: 'W: 2-1', wins: 3, losses: 3, rank: 4, oppRank: 5, innings: 29, opponent: 'Terry Carleton'}
				]
			},
			{
				date: '2019/04/02',
				place: 'Lucky Shot',
				opponent: 'Rack\'em',
				score: '7-7',
				matches: [
					{player: 'Stacey',  result: 'L: 0-3', wins: 0, losses: 5, rank: 2, oppRank: 5, innings: 43, opponent: 'Nathan Bolger'},
					{player: 'Rohan',   result: 'W: 2-1', wins: 5, losses: 4, rank: 6, oppRank: 6, innings: 31, opponent: 'Paul Bryan'},
					{player: 'Vishnu',  result: 'L: 0-3', wins: 0, losses: 3, rank: 4, oppRank: 4, innings: 20, opponent: 'Sai Rao Gangaraju'},
					{player: 'Harshit', result: 'W: 2-0', wins: 5, losses: 2, rank: 6, oppRank: 5, innings: 42, opponent: 'Tony Lemos'},
					{player: 'Dean',    result: 'W: 3-0', wins: 3, losses: 0, rank: 4, oppRank: 3, innings: 23, opponent: 'Andy Baron'}
				]
			},
			{
				date: '2019/04/09',
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				score:'5-8',
				matches: [
					{player: 'Juan',    result: 'W: 2-0', wins: 5, losses: 1, rank: 7, oppRank: 5, innings: 21, opponent: 'Peggy Brewster'},
					{player: 'Harshit', result: 'W: 3-0', wins: 5, losses: 0, rank: 6, oppRank: 5, innings: 27, opponent: 'Carla Macias'},
					{player: 'Rohan',   result: 'L: 0-2', wins: 2, losses: 5, rank: 6, oppRank: 6, innings: 22, opponent: 'Becky Simi'},
					{player: 'Shiksha', result: 'L: 0-3', wins: 0, losses: 4, rank: 2, oppRank: 4, innings: 24, opponent: 'Elena Lippman'},
					{player: 'Peter',   result: 'L: 0-3', wins: 0, losses: 3, rank: 2, oppRank: 3, innings: 28, opponent: 'Yunami Konno'}
				]
			},
			{
				date: '2019/04/16',
				place: 'Lucky Shot',
				opponent: 'Shenanigans',
				score:'7-7',
				matches: [
					{player: 'Juan',   result: 'W: 2-0', wins: 5, losses: 3, rank: 7, oppRank: 7, innings: 17, opponent: 'Garreth King'},
					{player: 'Stacey', result: 'L: 1-2', wins: 1, losses: 3, rank: 2, oppRank: 3, innings: 28, opponent: 'Aeillyne Yburan'},
					{player: 'Dean',   result: 'L: 1-2', wins: 2, losses: 3, rank: 4, oppRank: 4, innings: 48, opponent: 'Avinash Sharma'},
					{player: 'Rohan',  result: 'L: 1-2', wins: 4, losses: 4, rank: 6, oppRank: 5, innings: 42, opponent: 'Mathew Martinez'},
					{player: 'Vishnu', result: 'W: 2-1', wins: 3, losses: 1, rank: 4, oppRank: 3, innings: 35, opponent: 'Stephanie Ross'}
				]
			},
			{
				date: '2019/04/23',
				place: 'Lucky Shot',
				opponent: 'Strong Button',
				score:'9-6',
				matches: [
					{player: 'Juan',    result: 'L: 1-2', wins: 4, losses: 5, rank: 7, oppRank: 7, innings: 23, opponent: 'Michael Fisher'},
					{player: 'Harshit', result: 'W: 2-1', wins: 5, losses: 3, rank: 6, oppRank: 5, innings: 51, opponent: 'Elizabeth Jeung'},
					{player: 'Vishnu',  result: 'W: 2-1', wins: 3, losses: 2, rank: 4, oppRank: 4, innings: 29, opponent: 'Dan Shaw'},
					{player: 'Shiksha', result: 'L: 1-2', wins: 1, losses: 4, rank: 2, oppRank: 4, innings: 32, opponent: 'Alex Popovici'},
					{player: 'Dean',    result: 'W: 3-0', wins: 4, losses: 0, rank: 4, oppRank: 2, innings: 32, opponent: 'Chris Hogan'}
				]
			}
		]
	}		// Spring 2019
]; 		 // Archived Sessions
