import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import React from 'react';

// table with list of games -- most recent games first
const GameList = ({ games }) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Team 1</TableCell>
						<TableCell>Team 2</TableCell>
						<TableCell>Score</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{games.map((game) => (
						<TableRow
							key={game.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{game.date}
							</TableCell>
							<TableCell>{game.team1}</TableCell>
							<TableCell>{game.team2}</TableCell>
							<TableCell>{game.score}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default GameList;
