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
	let country = req.query.country;
	let club = req.query.club;
	let startDate = req.query.startDate;
	let endDate = req.query.endDate;

	if (country == undefined) country = '';
	if (club == undefined) club = '';
	if (!startDate) startDate = '1900-01-01';
	if (!endDate) endDate = '2100-01-01';

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
	SELECT
		IFNULL(ch_goals.total_goals, 0) AS Home_team_goals,
		IFNULL(ca_goals.total_goals, 0) AS Away_team_goals
	FROM
		ClubGame cg
	LEFT JOIN
		Clubs ch ON cg.Home_club_id = ch.club_id
	LEFT JOIN
		Clubs ca ON cg.Away_club_id = ca.club_id
	LEFT JOIN (
		SELECT
			game_id,
			club_id,
			COUNT(*) AS total_goals
		FROM
			ClubGoals
		WHERE
			type = 'Goal'
		GROUP BY
			game_id,
			club_id
	) AS ch_goals ON cg.game_id = ch_goals.game_id AND cg.Home_club_id = ch_goals.club_id
	LEFT JOIN (
		SELECT
			game_id,
			club_id,
			COUNT(*) AS total_goals
		FROM
			ClubGoals
		WHERE
			type = 'Goal'
		GROUP BY
			game_id,
			club_id
	) AS ca_goals ON cg.game_id = ca_goals.game_id AND cg.Away_club_id = ca_goals.club_id
	WHERE
    	cg.game_id = ${game_id};
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

// Route 2: GET /get_game_details
const get_game_details = async function (req, res) {
	const game_id = req.query.game_id;

	// Here is a complete example of how to query the database in JavaScript.
	// Only a small change (unrelated to querying) is required for TASK 3 in this route.
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

// Route 3: GET /get_basic_player_info
const get_basic_player_info = async function (req, res) {
	const player_id = req.query.player_id;

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

// Route 4: GET /get_detailed_player_info
const get_detailed_player_info = async function (req, res) {
	const player_id = req.query.player_id;

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

// Route 5: GET /get_player_total_game_events_info
const get_player_total_game_events_info = async function (req, res) {
	const player_id = req.query.player_id;

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
