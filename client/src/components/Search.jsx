import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const Search = ({ searchParams, onSearch, onSearchParamsChange }) => {
	const { club, country, startDate, endDate } = searchParams;

	const handleInputChange = (field, value) => {
		onSearchParamsChange({ ...searchParams, [field]: value });
	  };

	const handleSearchClick = () => {
		onSearch(searchParams);
	  };

	return (
		<>
			<h1>Game Search</h1>
			<Grid container spacing={2} alignItems='flex-end'>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						label='Club Name'
						value={club}
						onChange={(e) => handleInputChange('club', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						label='Country'
						value={country}
						onChange={(e) => handleInputChange('country', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						type='date'
						label='Start Date'
						InputLabelProps={{ shrink: true }}
						value={startDate}
						onChange={(e) => handleInputChange('startDate', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<TextField
						fullWidth
						type='date'
						label='End Date'
						InputLabelProps={{ shrink: true }}
						value={endDate}
						onChange={(e) => handleInputChange('endDate', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant='contained' onClick={handleSearchClick}>
						Search
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default Search;
