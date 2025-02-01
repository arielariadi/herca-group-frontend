/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';

import getAllSales from '../services/sales-service';
import paymentService from '../services/payment-service';

import Swal from 'sweetalert2';

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

export default function PaymentForm() {
	const [transactionNumbers, setTransactionNumbers] = useState<Sale[]>([]);
	const [selectedTransactionNumber, setSelectedTransactionNumber] =
		useState<string>('');
	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [paymentDate, setPaymentDate] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTransactionNumber = async () => {
			try {
				const response = await getAllSales();

				setTransactionNumbers(response.sales ?? []);
				console.log(response);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		fetchTransactionNumber();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!selectedTransactionNumber || !amount || !paymentDate) {
			Swal.fire({
				icon: 'error',
				title: 'Gagal melakukan pembayaran!',
				text: 'Harap isi semua inputan: Nomor Transaksi, Nominal Pembayaran, dan Tanggal Pembayaran',
			});
			setLoading(false);
			return;
		}

		const data = {
			penjualan_id: parseInt(selectedTransactionNumber, 10),
			jumlah_pembayaran: amount,
			tanggal_pembayaran: paymentDate,
		};

		try {
			const result = await Swal.fire({
				icon: 'warning',
				title: 'Apakah kamu yakin ingin melakukan pembayaran ini?',
				showConfirmButton: true,
				confirmButtonText: 'Ya, submit',
				showDenyButton: true,
				denyButtonText: 'Tidak',
			});

			if (result.isConfirmed) {
				const response = await paymentService(data);

				Swal.fire({
					icon: 'success',
					title: 'Pembayaran berhasil dilakukan!',
				});

				setSelectedTransactionNumber('');
				setAmount(undefined);
				setPaymentDate('');
			}
		} catch (error) {
			Swal.fire('Error', 'Gagal melakukan pembayaran!', 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleSelectedTransactionNumber = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedTransactionNumber(e.target.value);
	};

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(parseFloat(e.target.value));
	};

	const handlePaymentDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentDate(e.target.value);
	};

	if (loading)
		return <p className="text-center text-gray-600">Loading data...</p>;

	return (
		<form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-5">
			<label
				htmlFor="countries"
				className="block mb-2 text-sm font-medium text-gray-90">
				Pilih nomor transaksi
			</label>
			<select
				id="countries"
				value={selectedTransactionNumber}
				onChange={handleSelectedTransactionNumber}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
				<option value="">Pilih Nomor Transaksi</option>
				{transactionNumbers.map(transactionNumber => (
					<option key={transactionNumber.id} value={transactionNumber.id}>
						{transactionNumber.transaction_number}
					</option>
				))}
			</select>

			<label
				htmlFor="number-input"
				className="block mb-2 text-sm font-medium text-gray-90 mt-5">
				Nominal Pembayaran
			</label>
			<input
				type="number"
				id="number-input"
				value={amount ?? ''}
				onChange={handleAmountChange}
				aria-describedby="helper-text-explanation"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder="Masukkan nominal pembayaran"
				required
			/>

			<label
				htmlFor="date-input"
				className="block mb-2 text-sm font-medium text-gray-90 mt-5">
				Tanggal Pembayaran
			</label>
			<input
				type="date"
				id="date-input"
				value={paymentDate}
				onChange={handlePaymentDateChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				required
			/>

			<button
				type="submit"
				disabled={loading}
				className="mt-5 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
				{loading ? 'Memproses...' : 'Bayar'}
			</button>
		</form>
	);
}
