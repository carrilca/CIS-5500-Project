import * as React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GameDetailPage from './GameDetailPage';
import HomePage from './HomePage';
import PlayerPage from './PlayerPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/game',
		element: <GameDetailPage />,
	},
	{
		path: '/player',
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
