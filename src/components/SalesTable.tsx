/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';

import getAllSales from '../services/sales-service';

type Sale = {
	id: number;
	transaction_number: string;
	marketing_id: string;
	marketing: string;
	date: string;
	cargo_fee: number;
	total_balance: number;
	grand_total: number;
};

export default function SalesTable() {
	const [sales, setSales] = useState<Sale[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSales = async () => {
			try {
				setLoading(true);
				const response = await getAllSales();

				setSales(response.sales ?? []);
				console.log(response);
				setLoading(false);
			} catch (error) {
				setError('Gagal mengambil data!');
				setLoading(false);
			}
		};

		fetchSales();
	}, []);

	const formattedDate = (dateString: string): string => {
		const date = new Date(dateString);

		return date.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	if (loading)
		return <p className="text-center text-gray-600">Loading data...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="relative overflow-x-auto mt-6">
			<table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
				<thead className="text-xs text-gray-700 uppercase bg-gray-400">
					<tr>
						<th className="px-6 py-3">No</th>
						<th className="px-6 py-3">No Transaksi</th>
						<th className="px-6 py-3">Marketing</th>
						<th className="px-6 py-3">Tanggal</th>
						<th className="px-6 py-3">Biaya Kargo</th>
						<th className="px-6 py-3">Total Saldo</th>
						<th className="px-6 py-3">Total Keseluruhan</th>
					</tr>
				</thead>
				<tbody>
					{sales.map(sale => (
						<tr key={sale.id} className="bg-gray-200 border-b border-gray-200">
							<td className="px-6 py-4 border-b border-gray-400">{sale.id}</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{sale.transaction_number}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{sale.marketing}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{formattedDate(sale.date)}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{sale.cargo_fee}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{sale.total_balance}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{sale.grand_total}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
