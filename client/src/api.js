import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export const getRecentGames = async (params = {}) => {
	const response = await api.get('/get_recent_games', { params });

	return response.data;
};

export const getGameScores = async (gameId) => {
	const response = await api.get('/get_game_scores', {
		params: { game_id: gameId },
	});

	return response.data;
};

export const getPlayersByCountryOrRegion = async (params = {}) => {
	const response = await api.get('/get_players_by_country_or_region', {
		params,
	});

	return response.data;
};

export const getClubsByCountryOrRegion = async (params = {}) => {
	const response = await api.get('/get_clubs_by_country_or_region', {
		params,
	});

	return response.data;
};

export const getGameDetails = async (gameId) => {
	const response = await api.get('/get_game_details', {
		params: { game_id: gameId },
	});

	return response.data;
};

export const getBasicPlayerInfo = async (playerId) => {
	const response = await api.get('/get_basic_player_info', {
		params: { player_id: playerId },
	});

	return response.data;
};

export const getDetailedPlayerInfo = async (playerId) => {
	const response = await api.get('/get_detailed_player_info', {
		params: { player_id: playerId },
	});

	return response.data;
};