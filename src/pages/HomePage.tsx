import MarketingCommissionTable from '../components/MarketingCommissionTable';
import SalesTable from '../components/SalesTable';

export default function HomePage() {
	return (
		<div className="max-w-screen-xl mx-auto p-4">
			<div>
				<h1 className="text-3xl text-center font-bold">Data Penjualan</h1>

				<SalesTable />
			</div>

			<div className="mt-15">
				<h1 className="text-3xl text-center font-bold">Komisi Marketing</h1>

				<MarketingCommissionTable />
			</div>
		</div>
	);
}
