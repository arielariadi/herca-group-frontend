import { useState } from 'react';
import { NavLink } from 'react-router';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-white border-b-2 border-gray-200">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink
					to="/"
					className="flex items-center space-x-3 rtl:space-x-reverse">
					<span className="self-center text-2xl font-semibold whitespace-nowrap">
						Herca Group
					</span>
				</NavLink>
				<button
					onClick={toggleNavbar}
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
					aria-controls="navbar-default"
					aria-expanded={isOpen}>
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14">
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>
				<div
					className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
					id="navbar-default">
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									`block py-2 px-3 rounded-sm md:p-0 ${
										isActive
											? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 '
											: 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'
									}`
								}>
								Beranda
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/pembayaran"
								className={({ isActive }) =>
									`block py-2 px-3 rounded-sm md:p-0 ${
										isActive
											? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 '
											: 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 '
									}`
								}>
								Pembayaran
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/riwayat-pembayaran"
								className={({ isActive }) =>
									`block py-2 px-3 rounded-sm md:p-0 ${
										isActive
											? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 '
											: 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 '
									}`
								}>
								Riwayat Pembayaran
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
