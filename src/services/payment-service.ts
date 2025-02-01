import axios from 'axios';
import apiConfig from './api-config/config';
import handleApiError from './error-helper/handle-api-error';

type PaymentProps = {
	penjualan_id: number;
	jumlah_pembayaran: number;
	tanggal_pembayaran: string;
};

const paymentService = async (data: PaymentProps) => {
	try {
		const response = await axios.post(
			`${apiConfig.API_URL}/v1/payments`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export default paymentService;
