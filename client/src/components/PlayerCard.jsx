import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useGetBasicPlayerInfo } from '../query';

const PlayerCard = ({ playerId }) => {
	const { player, isLoadingPlayer } = useGetBasicPlayerInfo(playerId);

	if (isLoadingPlayer) {
		return (
			<Card sx={{ maxWidth: 345, mb: 2 }}>
				<CardContent>
					<CircularProgress size={20} />
				</CardContent>
			</Card>
		);
	}

	if (!player) return null;

	return (
		<>
			{player && (
				<Card sx={{ maxWidth: 345, mb: 2 }}>
					<CardContent>
						<Typography variant='h6' component='div'>
							{player.name} ({player.age} years)
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							Country: {player.country}
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							Overall: {player.overall}
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							Club Jersey Number: {player.club_jersey_number}
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							Year: {player.year}
						</Typography>
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default PlayerCard;
