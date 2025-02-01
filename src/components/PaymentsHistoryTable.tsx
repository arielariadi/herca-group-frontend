/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react';
import getAllPaymentsHistory from '../services/payments-history-service';

type PaymentProps = {
	id: number;
	marketing: string;
	transaction_number: string;
	jumlah_pembayaran: number;
	tanggal_pembayaran: string;
};

export default function PaymentHistoryTable() {
	const [paymentsHistoryData, setPaymentsHistoryData] = useState<
		PaymentProps[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPaymentsHistory = async () => {
			try {
				setLoading(true);
				const response = await getAllPaymentsHistory();

				setPaymentsHistoryData(response.paymentsHistory ?? []);

				console.log('response:', response);

				setLoading(false);
			} catch (error) {
				setError('Gagal mengambil Data!');
				setLoading(false);
			}
		};

		fetchPaymentsHistory();
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
					<tr className="text-center">
						<th className="px-6 py-3">No</th>
						<th className="px-6 py-3">Nomor Transaksi</th>
						<th className="px-6 py-3">Marketing</th>
						<th className="px-6 py-3">Jumlah Pembayaran</th>
						<th className="px-6 py-3">Tanggal Pembayaran</th>
					</tr>
				</thead>
				<tbody>
					{paymentsHistoryData.length > 0 ? (
						paymentsHistoryData.map((paymentHistory, index) => (
							<tr
								key={paymentHistory.id}
								className="text-center bg-gray-200 border-b border-gray-200">
								<td className="px-6 py-4 border-b border-gray-400">
									{index + 1}
								</td>
								<td className="px-6 py-4 border-b border-gray-400">
									{paymentHistory.transaction_number}
								</td>
								<td className="px-6 py-4 border-b border-gray-400">
									{paymentHistory.marketing}
								</td>
								<td className="px-6 py-4 border-b border-gray-400">
									{paymentHistory.jumlah_pembayaran.toLocaleString()}
								</td>
								<td className="px-6 py-4 border-b border-gray-400">
									{formattedDate(paymentHistory.tanggal_pembayaran)}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={5}
								className="px-6 py-4 text-center font-bold border-b border-gray-400">
								Tidak ada data riwayat pembayaran!
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
