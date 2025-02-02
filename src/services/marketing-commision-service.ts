import axios from 'axios';
import apiConfig from './api-config/config';
import handleApiError from './error-helper/handle-api-error';

const marketingCommisionService = async () => {
	try {
		const response = await axios.get(`${apiConfig.API_URL}/v1/marketings`);

		if (!response.data) {
			throw new Error('Data sales tidak ditemukan!');
		}

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export default marketingCommisionService;
