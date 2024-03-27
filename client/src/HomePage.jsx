import { Container } from '@mui/material';
import GameList from './components/GameList';
import Search from './components/Search';

const games = [
	{
		id: 1,
		date: '2023-04-01',
		team1: 'Team A',
		team2: 'Team B',
		score: '2 - 1',
	},
	{
		id: 2,
		date: '2023-04-02',
		team1: 'Team C',
		team2: 'Team D',
		score: '1 - 3',
	},
];

const HomePage = () => {
	return (
		<Container>
			<Search />
			<GameList games={games} />
		</Container>
	);
};

export default HomePage;
