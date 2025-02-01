/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const handleApiError = (error: any) => {
	if (axios.isAxiosError(error)) {
		console.log('API Error:', error.response?.data || error.message);
		throw new Error(
			error.response?.data?.message || 'Terjadi kesalahan pada server'
		);
	}
	throw error;
};

export default handleApiError;
