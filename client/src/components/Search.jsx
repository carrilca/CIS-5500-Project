import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
	const [club, setClub] = useState('');
	const [country, setCountry] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const handleSearch = () => {
		onSearch({ club, country, startDate, endDate });
	};

	return (
		<>
			<h1>Game Search</h1>
			<Grid container spacing={2} alignItems='flex-end'>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						label='Team Name'
						value={club}
						onChange={(e) => setClub(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						label='Country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						type='date'
						label='Start Date'
						InputLabelProps={{ shrink: true }}
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						type='date'
						label='End Date'
						InputLabelProps={{ shrink: true }}
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
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
