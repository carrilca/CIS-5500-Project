import * as React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GameDetailPage from './GameDetailPage';
import HomePage from './HomePage';

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
		path: '/playe',
		element: <GameDetailPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
