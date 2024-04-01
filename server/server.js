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
 * /author:
 *   get:
 *     summary: Get a list of users
 *     parameters:
 *          - in: query
 *            name: userId
 *            type: integer
 *            required: true
 *            description: Numeric ID of the user to get.
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
app.get('/author/:type', routes.author);
app.get('/random', routes.random);
app.get('/song/:song_id', routes.song);
app.get('/album/:album_id', routes.album);
app.get('/albums', routes.albums);
app.get('/album_songs/:album_id', routes.album_songs);
app.get('/top_songs', routes.top_songs);
app.get('/top_albums', routes.top_albums);
app.get('/search_songs', routes.search_songs);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
