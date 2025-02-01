import { NavLink } from 'react-router';

export default function Footer() {
	return (
		<footer className="bg-white shadow-sm border-t-2 border-gray-200 mt-10">
			<div className="w-full mx-auto max-w-screen-xl p-4 text-center">
				<span className="text-md text-gray-800">
					© 2025{' '}
					<NavLink to="/" className="hover:underline">
						Herca Group
					</NavLink>{' '}
					- Developed by Muhammad Ariel Ariadi
				</span>
			</div>
		</footer>
	);
}
