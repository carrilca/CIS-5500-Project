import * as React from 'react';

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

function App() {
	return <RouterProvider router={router} />;
}

export default App;
