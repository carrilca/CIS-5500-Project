import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineSeparator,
} from '@mui/lab';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetGameDetails, useGetGameScores } from './query';

const GameDetailPage = () => {
	const { gameId } = useParams();
	const navigate = useNavigate();

	const { game, isLoadingGame } = useGetGameDetails(gameId);
	const { scores, isLoadingScores } = useGetGameScores(gameId);

	if (isLoadingGame || isLoadingScores) {
		return <CircularProgress />;
	}

	//TODO: can we also just return club name?
	const getClubName = (clubId) => {
		return `Club ${clubId}`;
	};

	const getPlayerName = (playerId) => {
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
				Player {playerId}
			</Typography>
		);
	};

	return (
		<Card>
			<CardContent>
				<Typography variant='h5' gutterBottom>
					Game Details
				</Typography>
				<Typography variant='h6' gutterBottom>
					Score: {scores.home_goals || 0} - {scores.visitor_goals || 0}
				</Typography>
				{game.length > 0 ? (
					<>
						<Typography variant='body1' color='textSecondary' gutterBottom>
							Game Events:
						</Typography>
						<Timeline>
							{game.map((event, index) => (
								<TimelineItem key={event.game_event_id}>
									<TimelineSeparator>
										<TimelineDot />
										{index < game.length - 1 && <TimelineConnector />}
									</TimelineSeparator>
									<TimelineContent>
										<Typography>
											At minute: {event.minute} - Type: {event.type}:{' '}
											{getPlayerName(event.player_id)} (
											{getClubName(event.club_id)})
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
		</Card>
	);
};

export default GameDetailPage;
