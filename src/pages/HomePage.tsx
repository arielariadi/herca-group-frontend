import SalesTable from '../components/SalesTable';

export default function HomePage() {
	return (
		<div className="max-w-screen-xl mx-auto p-4">
			<h1 className="text-3xl text-center font-bold">Data Penjualan</h1>

			<SalesTable />
		</div>
	);
}
