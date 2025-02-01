import PaymentForm from '../components/PaymentForm';

export default function PaymentPage() {
	return (
		<>
			<div className="max-w-screen-xl mx-auto p-4">
				<h1 className="text-3xl text-center font-bold">Pembayaran</h1>

				<PaymentForm />
			</div>
		</>
	);
}
