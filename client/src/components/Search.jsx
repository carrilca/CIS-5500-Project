import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';

const Search = () => {
	const [teamName, setTeamName] = useState('');
	const [competition, setCompetition] = useState('');

	// TODO: add search logic
	const handleSearch = () => {
		console.log({ teamName, competition });
	};

	return (
		<>
			<h1>Game Search</h1>
			<Grid container spacing={2} alignItems='flex-end'>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						label='Team Name'
						value={teamName}
						onChange={(e) => setTeamName(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<InputLabel>Competition</InputLabel>
						<Select
							value={competition}
							label='Competition'
							onChange={(e) => setCompetition(e.target.value)}
						>
							<MenuItem value='Premier League'>Premier League</MenuItem>
							<MenuItem value='La Liga'>La Liga</MenuItem>
							{/* // TODO: dynamically render list */}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Button variant='contained' onClick={handleSearch}>
						Search
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default Search;
