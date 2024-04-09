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
import PlayerCard from './components/PlayerCard';
import { useGetGameDetails, useGetGameScores } from './query';

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
			<CardContent>
				<Typography variant='h5' gutterBottom>
					Game Details
				</Typography>
				<Typography variant='h6' gutterBottom>
					Score: {scores.Home_club_goals || 0} - {scores.visitor_goals || 0}
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
											At minute: {event.minute} - Event Type: {event.type}{' '}
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
				{game.map((event) => (
					<TimelineItem key={event.game_event_id}>
						<TimelineContent>
							<Typography>
								<PlayerCard playerId={event.player_id} />
							</Typography>
						</TimelineContent>
					</TimelineItem>
				))}
			</CardContent>
		</Card>
	);
};

export default GameDetailPage;
