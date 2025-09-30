import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import App from './pages/App.jsx';
import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Favorites from './pages/Favorites.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'movie/:id', element: <MovieDetails /> },
			{ path: 'favorites', element: <Favorites /> },
			{ path: 'about', element: <About /> },
			{ path: '*', element: <NotFound /> }
		]
	}
]);

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);


