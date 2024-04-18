import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	TablePagination
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useGetRecentGames } from '../query';
import React, { useEffect, useState } from "react";

const GameList = ({ searchParams, onFieldUpdate  }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
  
	const paginatedSearchParams = {
		...searchParams,
		page: page,
		page_size: rowsPerPage,
	  };

	const { games, isLoadingGames } = useGetRecentGames(paginatedSearchParams);
	const navigate = useNavigate();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	  };
	
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	  };

	const handleDetailsClick = (gameId, event) => {
		event.stopPropagation();
		navigate(`/game-details/${gameId}`);
	  };

	  if (isLoadingGames) {
		return <CircularProgress />;
	  }
	
	  if (!games || games.length === 0) return null;

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
						<TableCell>Details</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{games.map((game) => (
						<TableRow
							key={game.game_id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							style={{ cursor: 'pointer' }}
						>
							<TableCell component='th' scope='row'>
								{new Date(game.date).toLocaleDateString()}
							</TableCell>
							<TableCell>{game.stadium}</TableCell>
							<TableCell
								onClick={() => onFieldUpdate(game.country)}
								style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
								{game.country}
							</TableCell>
							<TableCell 
								onClick={() => onFieldUpdate('club', game.homeClub)} 
								style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
								{game.homeClub}
							</TableCell>
							<TableCell 
								onClick={() => onFieldUpdate('club', game.awayClub)} 
								style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
								{game.awayClub}
							</TableCell>
							<TableCell>
								<Button 
								size="small"
								variant="contained"
								style={{ backgroundColor: '#8cbbe9' }}
								onClick={(event) => handleDetailsClick(game.game_id, event)}
								>
								Details
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				
				<TablePagination
				rowsPerPageOptions={[5, 10, 20]}
				count={games.length < rowsPerPage ? games.length : -1}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelDisplayedRows={({ from, to, count }) => {
				  // Override the default text to just show the range without the total count
				  return `${from}-${to}`;
				}}
				/>
				
			</Table>
		</TableContainer>
	);
};

export default GameList;
