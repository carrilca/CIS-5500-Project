import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRecentGames } from '../query';

const GameList = () => {
	const { games, isLoadingGames } = useGetRecentGames();
	const navigate = useNavigate();

	if (isLoadingGames) {
		return <CircularProgress />;
	}

	if (!games || games.length === 0) return null;

	const handleRowClick = (gameId) => {
		navigate(`/game-details/${gameId}`);
	};

	return (
		<TableContainer component={Paper}>
			<Table aria-label='recent games table'>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Stadium</TableCell>
						<TableCell>Country</TableCell>
						<TableCell>Home Club</TableCell>
						<TableCell>Away Club</TableCell>
						<TableCell>Game ID</TableCell>
						<TableCell>Home Club ID</TableCell>
						<TableCell>Away Club ID</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{games.map((game) => (
						<TableRow
							key={game.game_id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							onClick={() => handleRowClick(game.game_id)}
							style={{ cursor: 'pointer' }}
						>
							<TableCell component='th' scope='row'>
								{new Date(game.date).toLocaleDateString()}
							</TableCell>
							<TableCell>{game.stadium}</TableCell>
							<TableCell>{game.country}</TableCell>
							<TableCell>{game.homeClub}</TableCell>
							<TableCell>{game.awayClub}</TableCell>
							<TableCell>{game.game_id}</TableCell>
							<TableCell>{game.Home_club_id}</TableCell>
							<TableCell>{game.Away_club_id}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default GameList;
