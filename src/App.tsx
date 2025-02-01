import { Routes, Route } from 'react-router';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';

import NotFoundPage from './pages/NotFoundPage';

function App() {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/pembayaran" element={<PaymentPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<Footer />
		</>
	);
}

export default App;
