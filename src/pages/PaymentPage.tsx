import PaymentForm from '../components/PaymentForm';
import PaymentHistoryTable from '../components/PaymentsHistoryTable';

export default function PaymentPage() {
	return (
		<>
			<div className="max-w-screen-xl mx-auto p-4">
				<div>
					<h1 className="text-3xl text-center font-bold">Pembayaran</h1>

					<PaymentForm />
				</div>

				<div className="mt-15">
					<h1 className="text-3xl text-center font-bold">Riwayat Pembayaran</h1>

					<PaymentHistoryTable />
				</div>
			</div>
		</>
	);
}
