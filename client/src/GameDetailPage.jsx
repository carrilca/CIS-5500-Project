import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineSeparator,
} from '@mui/lab';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetGameDetails } from './query';

const GameDetailPage = () => {
	const { gameId } = useParams();

	const { game, isLoadingGame } = useGetGameDetails(gameId);

	if (isLoadingGame) {
		return <CircularProgress />;
	}

	if (!game) return null;

	return (
		<Card>
			<CardContent>
				<Typography variant='h5' gutterBottom>
					{game.team1} vs {game.team2}
				</Typography>
				<Typography variant='h6' gutterBottom>
					Score: {game.score}
				</Typography>
				<Typography variant='body1' color='textSecondary' gutterBottom>
					Game Events:
				</Typography>
				<Timeline>
					{game.events.map((event, index) => (
						<TimelineItem key={index}>
							<TimelineSeparator>
								<TimelineDot />
								{index < game.events.length - 1 && <TimelineConnector />}
							</TimelineSeparator>
							<TimelineContent>
								<Typography>
									{event.minute}' - {event.event}: {event.player} ({event.team})
								</Typography>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			</CardContent>
		</Card>
	);
};

export default GameDetailPage;
