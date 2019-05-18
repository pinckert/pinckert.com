	const TableSize = [ "3-1/2x7\' COIN OP",
											"4x8\' COIN OP ",
											"4x8\' REG ",
											"4-1/2X9\' REG"
										];

	const S = {E8 : 'E8', WP8 : 'WP8', S8 : 'S8', B8 : '8B', BNR : 'B&R'};
	const Wins 				= [		//	Player Rank (primary index)
													[2, 2, 2, 2, 2, 2],		// Opponent Rank (secondary index)
													[3, 2, 2, 2, 2, 2],
													[4, 3, 2, 2, 2, 2],
													[5, 4, 4, 4, 4, 3],
													[6, 5, 5, 5, 5, 4],
													[7, 6, 5, 5, 5, 5]
											]	;


	function calcResult (winLoss, rank, oppRank) {
			shutout = score => {return (score == 0)};
			requiredWins = (r1, r2) => {return Wins[r1][r2]}	
			if (shutout[winLoss[0]]) return [0,3];
			if (shutout[winLoss[1]]) return [3,0];
			let myResult  = (winLoss[0] == requiredWins[rank, oppRank]) ? 2 : ((winLoss[0] == (requiredWins[rank][oppRank]-1) ? 1 : 0));
			let oppResult = (winLoss[1] == requiredWins[oppRank, rank]) ? 2 : ((winLoss[1] == (requiredWins[oppRank][rank]-1) ? 1 : 0));
			return [myResult, oppResult];
	};

	function calcMatchScore (matches) {
		totals = [];
		scores = matches.map((s) => {s.score});
		console.log(scores);
		return matches.reduce ((totals, scores) => {totals[0] += scores[0]; totals[1] += scores[1]; });
	}
	
	function calcInnings(gameList) {
		console.log(gameList);
		return gameList.reduce( (total, game) => {total + game.innings;})
	}

	const currentSession = {
		year: 2019,
		term: 'Spring',
		matches: [
			{
				date: '2019/01/08',
				duration: {start: '7:30', end: '11:00'},
				place: 'Lucky Shot',
				opponent: 'All Rack No Balls',
				get score() {calcMatchScore(this.matches)},
				tableSize: tableSize[3],
				putUpFirst: false,
				oppTeamRating: 5,

				matches: [
					{	player: 	'Harshit', 
						opponent: 'Robin Wong',	
						rank: 6, oppRank: 6, 
						get score()   {return calcScore(this.games)},
						get result()  {return calcResult(this.score, this.rank, this.oppRank)}, 
						get innings() {return calcInnings(this.games)},
						defenses: 1, oppDefenses: 0, 

						games: [
							{won: true,  innings: 6, timeouts: [0,0], special: ''},
							{won: true,  innings: 1, timeouts: [0,0], special: ''},
							{won: false, innings: 4, timeouts: [0,0], special: 'S8'},
							{won: true,  innings: 3, timeouts: [0,0], special: ''},
							{won: false, innings: 4, timeouts: [0,0], special: ''},
							{won: true,  innings: 2, timeouts: [0,0], special: ''},
						]
					},

					{ player: 'Juan',  
						opponent: 'Peggy Brewster',
						rank: 7, oppRank: 5, 
						get result()  {return calcResult(this.games)}, 
						get innings() {return calcInnings(this.games)},
						defenses: 4, oppDefenses: 3, 
						games: [
							{won: true , innings: 2, timeouts: [0,0], special: ''},
							{won: true , innings: 3, timeouts: [0,0], special: ''},
							{won: true , innings: 4, timeouts: [0,0], special: ''},
							{won: true , innings: 0, timeouts: [0,0], special: S[BNR]},
							{won: false, innings: 4, timeouts: [0,0], special: ''},
							{won: false, innings: 7, timeouts: [0,0], special: ''},
							{won: true , innings: 2, timeouts: [0,0], special: ''},
						]
					},

					{	player: 'Rohan',  
						opponent: 'Dana Koga',
						rank: 5, oppRank: 3, 
						get result()  {return calcResult(this.games)}, 
						get innings() {return calcInnings(this.games)},
						defenses: 2, oppDefenses: 2, 
						games: [
							{won: true , innings: 5, timeouts: [0,0], special: ''},
							{won: true , innings: 4, timeouts: [0,0], special: ''},
							{won: true , innings: 7, timeouts: [1,0], special: ''},
							{won: true , innings: 3, timeouts: [0,0], special: ''},
						]
					},

					{	player: 'Stacey',
						opponent: 'Yunami Konno',
						rank: 2, oppRank: 3,
						get result()  {return calcResult(this.games)}, 
						get innings() {return calcInnings(this.games)},	
						defenses: 2, oppDefenses: 2,
						games: [
							{won: true,  innings: 11, timeouts: [0,1], special: S[S8]},
							{won: false, innings: 11, timeouts: [1,1], special: ''},
							{won: false, innings: 7,  timeouts: [0,0], special: ''},
							{won: false, innings: 9,  timeouts: [0,0], special: ''},
						]										
					},  

					{ player: 'Shiksha', 
						opponent: 'Kiki Komgold',
						get result()  {return calcResult(this.games)}, 
						get innings() {return calcInnings(this.games)},
						defenses: 1, oppDefenses: 4,
						games: [
							{won: true, innings: 7,  timeouts: [2,1], special: ''},
							{won: true, innings: 15, timeouts: [2,2], special: ''},
					]
			},
		],
		},
	]
}
