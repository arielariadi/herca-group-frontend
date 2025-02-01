import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';

function App() {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<Footer />
		</>
	);
}

export default App;
