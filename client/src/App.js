import * as React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import GameDetailPage from './GameDetailPage';
import HomePage from './HomePage';
import PlayerPage from './PlayerPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/game-details/:gameId',
		element: <GameDetailPage />,
	},
	{
		path: '/player/:playerId',
		element: <PlayerPage />,
	},
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
