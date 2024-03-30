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
import React from 'react';

const game = {
	team1: 'Team A',
	team2: 'Team B',
	score: '2 - 3',
	events: [
		{ minute: '12', event: 'Goal', team: 'Team A', player: 'Player 1' },
		{
			minute: '34',
			event: 'Yellow Card',
			team: 'Team B',
			player: 'Player 2',
		},
		{ minute: '45', event: 'Goal', team: 'Team B', player: 'Player 3' },
		{ minute: '67', event: 'Goal', team: 'Team A', player: 'Player 4' },
		{ minute: '89', event: 'Goal', team: 'Team B', player: 'Player 5' },
	],
};

// TODO: game detail page
// clicking on the player should take you to the player detail page
// show card for each of the players in the video player page

const GameDetailPage = () => {
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
