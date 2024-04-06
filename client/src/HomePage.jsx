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

	return (
		<Container>
			<Search onSearch={handleSearch} />
			<GameList searchParams={searchParams} />
		</Container>
	);
};

export default HomePage;
