import { useQuery } from '@tanstack/react-query';
import {
	getBasicPlayerInfo,
	getDetailedPlayerInfo,
	getGameDetails,
	getGameScores,
	getPlayerTotalGameEvents,
	getRecentGames,
} from './api';

export const useGetRecentGames = (params = {}) => {
	const { data, isLoading } = useQuery({
		queryKey: ['getRecentGames', params],
		queryFn: () => getRecentGames(params),
	});

	return { games: data, isLoadingGames: isLoading };
};

export const useGetGameDetails = (gameId) => {
	const { data, isLoading } = useQuery({
		queryKey: ['getGameDetails', gameId],
		queryFn: () => getGameDetails(gameId),
		enabled: !!gameId,
	});

	const sortedData = data?.sort((a, b) => b.minute - a.minute);

	return { game: sortedData, isLoadingGame: isLoading };
};

export const useGetBasicPlayerInfo = (playerId) => {
	const { data, isLoading } = useQuery({
		queryKey: ['getBasicPlayerInfo', playerId],
		queryFn: () => getBasicPlayerInfo(playerId),
		enabled: !!playerId,
	});

	const recentData = data?.[0] || null;

	return { player: recentData, isLoadingPlayer: isLoading };
};

export const useGetDetailedPlayerInfo = (playerId) => {
	const { data, isLoading } = useQuery({
		queryKey: ['getDetailedPlayerInfo', playerId],
		queryFn: () => getDetailedPlayerInfo(playerId),
		enabled: !!playerId,
	});

	return { detailedPlayer: data, isLoadingDetailedPlayer: isLoading };
};

export const useGetGameScores = (gameId) => {
	const { data, isLoading } = useQuery({
		queryKey: ['getGameScores', gameId],
		queryFn: () => getGameScores(gameId),
		enabled: !!gameId,
	});

	return { scores: data, isLoadingScores: isLoading };
};

export const useGetPlayerGameEvents = (playerId) => {
	const { data, isLoading } = useQuery({
		queryKey: ['getPlayerTotalGameEvents', playerId],
		queryFn: () => getPlayerTotalGameEvents(playerId),
		enabled: !!playerId,
	});

	return { playerGameEvents: data, isLoadingPlayerGameEvents: isLoading };
};
