import axios from 'axios';
import apiConfig from './api-config/config';
import handleApiError from './error-helper/handle-api-error';

const getAllSales = async () => {
	try {
		const response = await axios.get(`${apiConfig.API_URL}/v1/sales`);

		if (!response.data || !response.data.sales) {
			throw new Error('Data sales tidak ditemukan!');
		}

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export default getAllSales;
