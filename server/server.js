const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
app.use(cors({
  origin: '*',
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
/**
 * @swagger
 * /get_recent_games:
 *   get:
 *     summary: Get a list of recent games
 *     parameters:
 *          - in: query
 *            name: club
 *            type: string
 *            required: false
 *            description: name of the club to be searched.
 *          - in: query
 *            name: country
 *            type: string
 *            required: false
 *            description: name of the country where games played to be searched.
 *          - in: query
 *            name: startDate
 *            schema:
 *               type: string
 *               format: date
 *            required: false
 *            description: start date for games.
 *          - in: query
 *            name: endDate
 *            schema:
 *               type: string
 *               format: date
 *            required: false
 *            description: end date for games.
 *          - in: query
 *            name: competetion
 *            type: string
 *            required: false
 *            description: competetion search param for games.
 *     description: Retrieve a list of recent games from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of games.
 */
app.get('/get_recent_games', routes.get_recent_games);

/**
 * @swagger
 * /get_players_by_country_or_region:
 *   get:
 *     summary: Get a list of players by country or region
 *     parameters:
 *          - in: query
 *            name: region
 *            type: string
 *            required: false
 *            description: name of the region to be searched.
 *          - in: query
 *            name: country
 *            type: string
 *            required: false
 *            description: name of the country where games played to be searched.
 *     description: Retrieve a list of players from the database based on country or region.
 *     responses:
 *       200:
 *         description: Successful response with a list of players.
 */
app.get('/get_players_by_country_or_region', routes.get_players_by_country_or_region);

/**
 * @swagger
 * /get_clubs_by_country_or_region:
 *   get:
 *     summary: Get a list of clubs by country or region
 *     parameters:
 *          - in: query
 *            name: region
 *            type: string
 *            required: false
 *            description: name of the region to be searched.
 *          - in: query
 *            name: country
 *            type: string
 *            required: false
 *            description: name of the country where games played to be searched.
 *     description: Retrieve a list of clubs from the database based on country or region.
 *     responses:
 *       200:
 *         description: Successful response with a list of clubs.
 */
app.get('/get_clubs_by_country_or_region', routes.get_clubs_by_country_or_region);

/**
 * @swagger
 * /get_game_details:
 *   get:
 *     summary: Get a details of the game
 *     parameters:
 *          - in: query
 *            name: game_id
 *            type: int
 *            required: true
 *            description: game_id of the game
 *     description: Get details of the game
 *     responses:
 *       200:
 *         description: Successful response with games events and player details (fifa card layout).
 */
app.get('/get_game_details', routes.get_game_details);

/**
 * @swagger
 * /get_detailed_player_info:
 *   get:
 *     summary: Get a details of the player
 *     parameters:
 *          - in: query
 *            name: player_id
 *            type: int
 *            required: true
 *            description: player_id of the player
 *     description: Get details of the player
 *     responses:
 *       200:
 *         description: Successful response with detailed information about the player
 */
app.get('/get_detailed_player_info', routes.get_detailed_player_info);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
