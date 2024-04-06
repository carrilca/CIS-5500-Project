import { TabContext, TabPanel } from '@mui/lab';
import {
	Box,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Typography,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDetailedPlayerInfo } from './query';

const PlayerPage = () => {
	const { playerId } = useParams();
	const [currentTab, setCurrentTab] = useState('1');

	const { detailedPlayer, isLoadingDetailedPlayer } =
		useGetDetailedPlayerInfo(playerId);

	if (isLoadingDetailedPlayer) {
		return <CircularProgress />;
	}

	if (!detailedPlayer || detailedPlayer.length === 0) {
		return (
			<Typography variant='h5' style={{ padding: 20 }}>
				No player data available.
			</Typography>
		);
	}

	const handleChange = (e, tabName) => {
		setCurrentTab(tabName);
	};

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<TabContext value={currentTab}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={currentTab}
						onChange={handleChange}
						aria-label='Player Profile Tabs'
					>
						<Tab label='Overview' value='1' />
						<Tab label='Statistics' value='2' />
						<Tab label='Career Progression' value='3' />
					</Tabs>
				</Box>
				<TabPanel value='1'>
					<Typography variant='h4' gutterBottom>
						{detailedPlayer[0]?.name} ({detailedPlayer[0].age})
					</Typography>
					<Typography variant='h6' gutterBottom>
						Position: {detailedPlayer[0].player_positions},{' '}
						{detailedPlayer[0].country}
					</Typography>
					<img
						src={detailedPlayer[0].player_face_url}
						alt='Player'
						style={{ width: 120, height: 120 }}
					/>
					<Typography>
						Club Jersey Number: {detailedPlayer[0].club_jersey_number}
					</Typography>
					<Typography>
						Preferred Foot: {detailedPlayer[0].preferred_foot}
					</Typography>
					<Typography>
						Preferred Foot: {detailedPlayer[0].preferred_foot}
					</Typography>
				</TabPanel>
				<TabPanel value='2'>
					<Card>
						<CardContent>
							<Typography variant='h5' gutterBottom>
								Latest Season Statistics
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={6} sm={3}>
									<Typography>Overall: {detailedPlayer[0].overall}</Typography>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Typography>
										Shooting: {detailedPlayer[0].shooting}
									</Typography>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Typography>
										Dribbling: {detailedPlayer[0].dribbling}
									</Typography>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Typography>
										Skill moves: {detailedPlayer[0].skill_moves}
									</Typography>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Typography>Passing: {detailedPlayer[0].passing}</Typography>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Typography>
										Defending: {detailedPlayer[0].defending}
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</TabPanel>
				<TabPanel value='3'>
					{detailedPlayer.map((yearData, index) => (
						<Card key={index} sx={{ mb: 2 }}>
							<CardContent>
								<Typography variant='h6'>Year: {yearData.year}</Typography>
								<Typography>Overall: {yearData.overall}</Typography>
								<Typography>Potential: {yearData.potential}</Typography>
							</CardContent>
						</Card>
					))}
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default PlayerPage;
