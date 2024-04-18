import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineSeparator,
	TimelineOppositeContent,
} from '@mui/lab';
import { Card, CardContent, CircularProgress, Typography, Grid } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerCard from './components/PlayerCard';
import { useGetGameDetails, useGetGameScores } from './query';
import logo from './assets/logo.png'
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import banner from './assets/banner.jpeg'
import './styles.css'

const GameDetailPage = () => {
	const { gameId } = useParams();
	const navigate = useNavigate();

	const { game, isLoadingGame } = useGetGameDetails(gameId);
	const { scores, isLoadingScores } = useGetGameScores(gameId);

	if (isLoadingGame || isLoadingScores) {
		return <CircularProgress />;
	}

	const getPlayerName = (playerId, name) => {
		return (
			<Typography
				component='span'
				style={{
					cursor: 'pointer',
					textDecoration: 'underline',
					color: 'blue',
				}}
				onClick={() => navigate(`/player/${playerId}`)}
			>
				{name}
			</Typography>
		);
	};

	return (
		<Card>
			<div class="topnav">
				<img src={logo} width="159" height="40"/>
			</div>
			<CardContent>
				<br></br>
				<div class = "container">
					<img src={banner} width="130%" height="160" style={{marginLeft: "-20px"}}/>
					<div class = "centered">
						<h2>Game Details for {scores.home_club_name } vs {scores.away_club_name}</h2>
						<h2><b>{scores.home_club_name }{' '}{ scores.Home_club_goals || 0} : {scores.away_club_name}{' '}{scores.Away_club_goals || 0}</b></h2>
					</div>
				</div>
				
				{game.length > 0 ? (
					<>
						<Typography variant='body1' color='textSecondary' gutterBottom>
							<h3>Game Events:</h3>
						</Typography>
						<Timeline>
							{game.sort(({minute: a}, {minute:b}) => a-b).map((event, index) => (
								<TimelineItem key={event.game_event_id}>
									<TimelineOppositeContent>
										<Typography>
											<b>{event.minute}'</b> 
										</Typography>
									</TimelineOppositeContent>
									<TimelineSeparator>
										<TimelineDot color="primary">
											{event.type === 'Cards' ? (<CropPortraitIcon />):(<SportsSoccerIcon />)}
										</TimelineDot>
										{index < game.length - 1 && <TimelineConnector />}
									</TimelineSeparator>
									<TimelineContent>
										<Typography>
											<b>{event.type}{' by '}</b>
											{getPlayerName(event.player_id, event.name)} Club:{' '}
											{event.club_name}
										</Typography>
									</TimelineContent>
								</TimelineItem>
							))}
						</Timeline>
					</>
				) : (
					<Typography variant='body1' color='textSecondary'>
						No game events available.
					</Typography>
				)}
			</CardContent>
			<CardContent>
			<Typography variant='body1' color='textSecondary' gutterBottom>
					<h3>Players In Action:</h3>
				</Typography>
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{[...new Map(game.map(item =>[item['name'], item])).values()].map((event) => (
					  <Grid item xs={3}>
							{console.log(event)}
							<PlayerCard playerId={event.player_id} event={event}/>
						</Grid>
				))}
				</Grid>

			</CardContent>
		</Card>
	);
};

export default GameDetailPage;
