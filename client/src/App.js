import * as React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AboutPage from './AboutPage';
import HomePage from './HomePage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/about',
		element: <AboutPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
