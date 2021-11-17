import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import MainAppRouter from './router/Main';
function App() {
	return (
		<BrowserRouter>
			<MainAppRouter />
		</BrowserRouter>
	);
}

export default App;
