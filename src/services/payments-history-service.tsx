import axios from 'axios';
import apiConfig from './api-config/config';
import handleApiError from './error-helper/handle-api-error';

const getAllPaymentsHistory = async () => {
	try {
		const response = await axios.get(
			`${apiConfig.API_URL}/v1/payments/payments-history`
		);

		if (!response.data || !response.data.paymentsHistory) {
			throw new Error('Riwayat pembayaran tidak ditemukan!');
		}

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export default getAllPaymentsHistory;
