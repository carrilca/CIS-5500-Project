import { TabContext, TabPanel } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const player = {
	name: 'John Doe',
	team: 'FC Barcelona',
	position: 'Forward',
	stats: {
		matches: 23,
		goals: 12,
		assists: 5,
	},
	recentGames: [
		{ opponent: 'Real Madrid', result: 'Won 3-2', date: '2023-03-21' },
		{ opponent: 'Atletico Madrid', result: 'Lost 0-1', date: '2023-03-14' },
	],
};

// remove player out
// Video game stats
// Stats for real life games
// personal info
// graphs
const PlayerPage = () => {
	const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='Player Profile Tabs'
					>
						<Tab label='Overview' value='1' />
						<Tab label='Statistics' value='2' />
						<Tab label='Recent Games' value='3' />
					</Tabs>
				</Box>
				<TabPanel value='1'>
					<Typography variant='h4'>{player.name}</Typography>
					<Typography variant='h6'>
						{player.team} - {player.position}
					</Typography>
				</TabPanel>
				<TabPanel value='2'>
					<Card>
						<CardContent>
							<Typography variant='h5'>Statistics</Typography>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<Typography>Matches: {player.stats.matches}</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography>Goals: {player.stats.goals}</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography>Assists: {player.stats.assists}</Typography>
								</Grid>
							</Grid>
							{/* // TODO: Add Chart */}
						</CardContent>
					</Card>
				</TabPanel>
				<TabPanel value='3'>
					<Typography variant='h5'>Recent Games</Typography>
					{player.recentGames.map((game, index) => (
						<Box key={index} my={2}>
							<Typography>
								{game.opponent} - {game.result} ({game.date})
							</Typography>
						</Box>
					))}
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default PlayerPage;
