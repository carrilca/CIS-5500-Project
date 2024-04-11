const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection({
	host: config.rds_host,
	user: config.rds_user,
	password: config.rds_password,
	port: config.rds_port,
	database: config.rds_db,
});

connection.connect((err) => {
	if (err) {
		console.log('Failed to connect to DB', err);
	} else {
		console.log('Connected to DB');
	}
});

// ROUTE 1: GET /get_recent_games
// ● Description: 
// 		This route returns a list of the 10 most recent games, sorted in 
// 	 	descending order based on current date (i.e: most recent dates first).
//
// ● Request path: 
// 		GET /get_recent_games
//
// ● Query/Request parameters:
// 		country, string
// 		club, string
// 		startDate, string
// 		endDate, string
//
// ● Response parameters: 
// 		game_id, int 
// 		date, string
// 		stadium, string
// 		country, string
// 		homeClub, string
// 		awayClub, string
// 		home_club_id, int
// 		away_club_id, int
//
const get_recent_games = async function (req, res) {
	// Set Request parameters
	let country = req.query.country;
	let club = req.query.club;
	let startDate = req.query.startDate;
	let endDate = req.query.endDate;

	if (country == undefined) country = '';
	if (club == undefined) club = '';
	if (!startDate) startDate = '1900-01-01';
	if (!endDate) endDate = '2100-01-01';

	// Execute query:
	connection.query(
		`
		SELECT c.game_id, c.date, c.stadium, c3.country, c1.club_name AS homeClub, c2.club_name AS awayClub, c.Home_club_id, c.Away_club_id
		FROM ClubGame c JOIN Clubs c1 ON (c.Home_club_id = c1.club_id) JOIN PlayerCountries c3 ON (c1.country_id = c3.ID), Clubs c2
		WHERE c.Away_club_id = c2.club_id AND
		(c3.country LIKE "%${country}") AND
		(c1.club_name LIKE "%${club}%" OR c2.club_name LIKE "%${club}%") AND
		(c.date > "${startDate}") AND
		(c.date < "${endDate}")
		ORDER BY date DESC
		LIMIT 10;
		`,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		}
	);
};

// ROUTE 1B: GET /get_game_scores
// ● Description: 
// 		This route returns the final score produced on
//   	a match identified by a game_id (i.e.: Home 0:2 Visitor)
//
// ● Request path: 
// 		GET /get_game_scores
//
// ● Query/Request parameters:
// 		game_id, int
//
// ● Response parameters: 
// 		Home_club_goals, int 
// 		Away_club_goals, int
//
const get_game_scores = async function (req, res) {
	// Set Request parameters
	let game_id = req.query.game_id;
	
	// Execute query:
	connection.query(
		`
		WITH SCORE AS (
			SELECT club_id, game_id, COUNT(*) AS goals
			FROM ClubGoals
			WHERE type = 'Goals' AND game_id=${game_id}
			GROUP BY game_id, club_id
		),
		
		SCORE_HOME_AWAY AS (
			SELECT B.goals, A.home_club_id, A.away_club_id,
			CASE 
				WHEN B.club_id = A.home_club_id THEN 'HOME'
				WHEN B.club_id = A.away_club_id THEN 'AWAY'
				ELSE 'UNKNOWN'
			END as team
			FROM ClubGame A
			JOIN SCORE B ON A.game_id = B.game_id
		),

		HOME_CLUB_NAME AS (
			SELECT D.club_name AS home_club_name
			FROM SCORE_HOME_AWAY C JOIN Clubs D
			ON C.home_club_id=D.club_id
			WHERE C.team='HOME'
		),

		AWAY_CLUB_NAME AS (
			SELECT D.club_name AS away_club_name
			FROM SCORE_HOME_AWAY C JOIN Clubs D
			ON C.away_club_id=D.club_id
			WHERE C.team='AWAY'
		)		
		
		SELECT 
			SUM(CASE WHEN team = 'HOME' THEN goals ELSE 0 END) AS Home_club_goals,
			SUM(CASE WHEN team = 'AWAY' THEN goals ELSE 0 END) AS Away_club_goals,
			home_club_name, away_club_name
		FROM SCORE_HOME_AWAY, HOME_CLUB_NAME, AWAY_CLUB_NAME;
		`,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data[0]);
			}
		}
	);
};

// ROUTE 2: GET /get_game_details
// ● Description: 
// 		This route returns detailed info associated to a soccer  
//   	match identified by a game_id (i.e.: Home 0:2 Visitor)
//
// ● Request path: 
// 		GET /get_game_details
//
// ● Query/Request parameters:
// 		game_id, int
//
// ● Response parameters: 
// 		game_event_id, int
// 		club_id, int
// 		club_name, string
// 		type, string
// 		minute, int
// 		player_id, int
// 		name, string
//
const get_game_details = async function (req, res) {
	// Set Request parameters
	const game_id = req.query.game_id;

	// Execute query:
	connection.query(
		`
		SELECT c.game_event_id, c.club_id, c1.club_name, c.type, c.minute, c.player_id, p.name
		FROM ClubGoals c JOIN Clubs c1 ON c1.club_id = c.club_id JOIN Players p ON p.id = c.player_id
		WHERE c.game_id = ${game_id};
		`,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		}
	);
};

// ROUTE 3: GET /get_basic_player_info
// ● Description: 
// 		This route returns basic info associated to   
//   	a soccer player identified by a player_id.
//
// ● Request path: 
// 		GET /get_basic_player_info
//
// ● Query/Request parameters:
// 		player_id, int
//
// ● Response parameters: 
// 		year, int
// 		overall, int
// 		age, int
// 		name, string
// 		club_jersey_number, int
// 		country, string
//
const get_basic_player_info = async function (req, res) {
	// Set Request parameters
	const player_id = req.query.player_id;

	// Execute query:
	connection.query(
		`
		SELECT p.year, p.overall, p.age, p2.name, p.club_jersey_number, pc.country
		FROM VideoGamePlayers p JOIN Players p2 on p.player_id = p2.id JOIN PlayerCountries pc ON p2.country_id = pc.ID
		WHERE p2.id = ${player_id}
		ORDER BY p.year DESC;
		`,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		}
	);
};

// ROUTE 4: GET /get_detailed_player_info
// ● Description: 
// 		This route returns detailed info associated to   
//   	a soccer player identified by a player_id.
//
// ● Request path: 
// 		GET /get_detailed_player_info
//
// ● Query/Request parameters:
// 		player_id, int
//
// ● Response parameters: 
// 		year, int
// 		overall, int
// 		age, int
// 		name, string
// 		club_jersey_number, int
//  	shooting, int
//  	dribbling, int
//  	skill_moves, []string
//  	passing, int
//  	defending, int
//  	country, string
//  	player_positions, []string
//  	preferred_foot, string
//  	player_face_url, string
//  	potential, int
//  	weight_kg, int
//  	height_cm, int
// 	 	value_eur, int
//  	wage_eur, int
//
const get_detailed_player_info = async function (req, res) {
	// Set Request parameters
	const player_id = req.query.player_id;

	// Execute query:
	connection.query(
		`
		SELECT p.year, p.overall, p.age, p2.name, p.club_jersey_number, p.shooting, p.dribbling, p.skill_moves, p.passing, p.defending, pc.country, p.player_positions,
		p.preferred_foot, p.player_face_url, p.potential, p.weight_kg, p.height_cm, p.value_eur, p.wage_eur
		FROM Players p2 LEFT JOIN VideoGamePlayers p on p.player_id = p2.id JOIN PlayerCountries pc ON p2.country_id = pc.ID
		WHERE p2.id = ${player_id}
		ORDER BY p.year DESC;
		`,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		}
	);
};

// ROUTE 5: GET /get_player_total_game_events_info
// ● Description: 
// 		This route returns info associated to a soccer 
//   	player's performance on games identified by a player_id.
//
// ● Request path: 
// 		GET /get_player_total_game_events_info
//
// ● Query/Request parameters:
// 		player_id, int
//
// ● Response parameters: 
// 		c1.club_name, string
// 		cg.type, int
// 		total, int
//
const get_player_total_game_events_info = async function (req, res) {
	// Set Request parameters
	const player_id = req.query.player_id;

	// Execute query:
	connection.query(
		`
		SELECT c1.club_name, cg.type, COUNT(*) AS total
		FROM ClubGoals cg JOIN Clubs c1 ON c1.club_id = cg.club_id
		WHERE cg.player_id = ${player_id}
		GROUP BY cg.type, c1.club_name;
		`,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		}
	);
};

module.exports = {
	get_recent_games,
	get_game_scores,
	get_game_details,
	get_basic_player_info,
	get_detailed_player_info,
	get_player_total_game_events_info
};
