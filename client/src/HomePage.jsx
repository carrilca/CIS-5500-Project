import { Container } from '@mui/material';
import React, { useState } from 'react';
import GameList from './components/GameList';
import Search from './components/Search';
import './styles.css'
import logo from './assets/logo.png'

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
		<Container disableGutters maxWidth={true}>
		<div class="topnav">
			<img src={logo} width="159" height="40"/>
		</div>

		<div class="bodyContent">
			<Search 
				searchParams={searchParams} 
				onSearch={handleSearch} 
				onSearchParamsChange={setSearchParams} // Passing function to update search parameters
			/>
			<GameList
				searchParams={searchParams}
				onFieldUpdate={handleFieldUpdate}
			/>
		</div>
		</Container>
	);
};

export default HomePage;
