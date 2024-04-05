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

// Route 1: GET /get_recent_games
const get_recent_games = async function (req, res) {
	console.log('get_recent_games');
	let country = req.query.country;
	let club = req.query.club;
	let startDate = req.query.startDate;
	let endDate = req.query.endDate;

	if (country == undefined) country = '';
	if (club == undefined) club = '';
	if (startDate == undefined) startDate = '1900-01-01';
	if (endDate == undefined) endDate = '2100-01-01';

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

// Route 1b: GET /get_game_scores
const get_game_scores = async function (req, res) {
	let game_id = req.query.game_id;

	connection.query(
		`
  WITH HomeClubGoals AS (
    SELECT HCG.game_id, HCG.club_id, COUNT(*) AS home_goals
    FROM ClubGoals HCG
    WHERE HCG.type = 'Goals'
    GROUP BY HCG.game_id
  ),
  VisitorClubGoals AS (
    SELECT VCG.game_id, VCG.club_id, COUNT(*) AS visitor_goals
    FROM ClubGoals VCG
    WHERE VCG.type = 'Goals'
    GROUP BY VCG.game_id
  )

  SELECT DISTINCT
    HG.home_goals,
    VG.visitor_goals
  FROM
    ClubGame CG
  LEFT JOIN HomeClubGoals HG
    ON CG.game_id=HG.game_id AND CG.home_club_id=HG.club_id
  LEFT JOIN VisitorClubGoals VG
    ON CG.game_id=VG.game_id AND CG.away_club_id=VG.club_id
  JOIN ClubGoals CGL
    ON CG.game_id=VG.game_id
  WHERE
    CG.game_id = ${game_id};
  `,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json({});
			} else {
				res.json(data[0]);
			}
		}
	);
};

// Route 2: GET /get_players_by_country_or_region
const get_players_by_country_or_region = async function (req, res) {
	const country = req.query.country;
	const region = req.query.region;

	// Here is a complete example of how to query the database in JavaScript.
	// Only a small change (unrelated to querying) is required for TASK 3 in this route.
	connection.query(
		`

  `,
		(err, data) => {
			if (err || data.length === 0) {
				// If there is an error for some reason, or if the query is empty (this should not be possible)
				// print the error message and return an empty object instead
				console.log(err);
				// Be cognizant of the fact we return an empty object {}. For future routes, depending on the
				// return type you may need to return an empty array [] instead.
				res.json({});
			} else {
				// Here, we return results of the query as an object, keeping only relevant data
				// being song_id and title which you will add. In this case, there is only one song
				// so we just directly access the first element of the query results array (data)
				// TODO (TASK 3): also return the song title in the response
				res.json({
					//response
				});
			}
		}
	);
};

// Route 3: GET /get_clubs_by_country_or_region
const get_clubs_by_country_or_region = async function (req, res) {
	const country = req.query.country;
	const region = req.query.region;

	// Here is a complete example of how to query the database in JavaScript.
	// Only a small change (unrelated to querying) is required for TASK 3 in this route.
	connection.query(
		`

  `,
		(err, data) => {
			if (err || data.length === 0) {
				// If there is an error for some reason, or if the query is empty (this should not be possible)
				// print the error message and return an empty object instead
				console.log(err);
				// Be cognizant of the fact we return an empty object {}. For future routes, depending on the
				// return type you may need to return an empty array [] instead.
				res.json({});
			} else {
				// Here, we return results of the query as an object, keeping only relevant data
				// being song_id and title which you will add. In this case, there is only one song
				// so we just directly access the first element of the query results array (data)
				// TODO (TASK 3): also return the song title in the response
				res.json({
					//response
				});
			}
		}
	);
};

// Route 4: GET /get_game_details
const get_game_details = async function (req, res) {
	const game_id = req.query.game_id;

	// Here is a complete example of how to query the database in JavaScript.
	// Only a small change (unrelated to querying) is required for TASK 3 in this route.
	connection.query(
		`
  SELECT c.game_event_id, c.club_id, c.type, c.minute, c.player_id
  FROM ClubGoals c
  WHERE c.game_id = ${game_id};
  `,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json({});
			} else {
				res.json(data);
			}
		}
	);
};

// Route 4: GET /get_detailed_player_info
const get_basic_player_info = async function (req, res) {
	const player_id = req.query.player_id;

	connection.query(
		`
  SELECT p.year, p.overall, p.age, p2.name, p.jersey_number, pc.country
  FROM VideoGamePlayers p JOIN Players p2 on p.player_id = p2.id JOIN PlayerCountries pc ON p2.country_id = pc.ID
  WHERE p2.id = ${player_id}
  ORDER BY p.year DESC;
  `,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json({});
			} else {
				res.json({});
			}
		}
	);
};

// Route 5: GET /get_detailed_player_info
const get_detailed_player_info = async function (req, res) {
	const player_id = req.query.player_id;

	connection.query(
		`
  SELECT p.year, p.overall, p.age, p2.name, p.club_jersey_number, p.shooting, p.dribbling, p.skill_moves, p.passing, p.defending, pc.country, p.player_positions,
  p.preferred_foot, p.player_face_url, p.potential, p.weight_kg, p.height_cm, p.value_eur, p.wage_eur
  FROM VideoGamePlayers p JOIN Players p2 on p.player_id = p2.id JOIN PlayerCountries pc ON p2.country_id = pc.ID
  WHERE p2.id = ${player_id}
  ORDER BY p.year DESC;
  `,
		(err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json({});
			} else {
				res.json({});
			}
		}
	);
};
module.exports = {
	get_recent_games,
	get_game_scores,
	get_players_by_country_or_region,
	get_clubs_by_country_or_region,
	get_game_details,
	get_basic_player_info,
	get_detailed_player_info,
};
