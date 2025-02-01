import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';

function App() {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
