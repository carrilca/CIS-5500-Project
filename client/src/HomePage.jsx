import { Container } from '@mui/material';
import React, { useState } from 'react';
import GameList from './components/GameList';
import Search from './components/Search';

const HomePage = () => {
	const [searchParams, setSearchParams] = useState({
		club: '',
		country: '',
		startDate: '',
		endDate: '',
	});

	const handleSearch = (params) => {
		setSearchParams(params);
	};

	const handleFieldUpdate = (field, value) => {
		setSearchParams(prevParams => ({ ...prevParams, [field]: value }));
	  };	

	return (
		<Container>
			<Search 
				searchParams={searchParams} 
				onSearch={handleSearch} 
				onSearchParamsChange={setSearchParams} // Passing function to update search parameters
			/>
			<GameList
				searchParams={searchParams}
				onFieldUpdate={handleFieldUpdate}
			/>
		</Container>
	);
};

export default HomePage;
