/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react';
import marketingCommisionService from '../services/marketing-commision-service';

type MarketingCommsionProps = {
	id_marketing: number;
	marketing: string;
	bulan: string;
	omzet: number;
	komisiPersen: number;
	komisiNominal: number;
};

export default function MarketingCommissionTable() {
	const [marketingCommisionData, setMarketingCommisionData] = useState<
		MarketingCommsionProps[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMarketingCommsiion = async () => {
			try {
				setLoading(true);
				const response = await marketingCommisionService();

				setMarketingCommisionData(response ?? []);

				console.log(response);

				setLoading(false);
			} catch (error) {
				setError('Gagal mengambil data!');
				setLoading(false);
			}
		};

		fetchMarketingCommsiion();
	}, []);

	const formattedMonth = (monthString: string): string => {
		const date = new Date(monthString);

		return date.toLocaleDateString('id-ID', {
			month: 'long',
		});
	};

	if (loading)
		return <p className="text-center text-gray-600">Loading data...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="relative overflow-x-auto mt-6">
			<table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
				<thead className="text-xs text-gray-700 uppercase bg-gray-400">
					<tr className="text-center">
						<th className="px-6 py-3">No</th>
						<th className="px-6 py-3">Marketing</th>
						<th className="px-6 py-3">Bulan</th>
						<th className="px-6 py-3">Omzet</th>
						<th className="px-6 py-3">Komisi %</th>
						<th className="px-6 py-3">Komisi Nominal</th>
					</tr>
				</thead>
				<tbody>
					{marketingCommisionData.map((marketingCommssion, index) => (
						<tr
							key={index + 1}
							className="text-center bg-gray-200 border-b border-gray-200">
							<td className="px-6 py-4 border-b border-gray-400">
								{index + 1}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{marketingCommssion.marketing}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{formattedMonth(marketingCommssion.bulan)}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{marketingCommssion.omzet.toLocaleString()}
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{marketingCommssion.komisiPersen}%
							</td>
							<td className="px-6 py-4 border-b border-gray-400">
								{marketingCommssion.komisiNominal.toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
