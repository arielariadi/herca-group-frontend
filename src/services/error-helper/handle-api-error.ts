/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const handleApiError = (error: any) => {
	if (axios.isAxiosError(error)) {
		const errorResponse = error.response?.data;
		if (errorResponse?.errors) {
			// Jika error berupa array (misalnya dari validasi Joi)
			throw new Error(errorResponse.errors.join(', '));
		} else if (errorResponse?.message) {
			// Jika error berupa pesan tunggal
			throw new Error(errorResponse.message);
		} else {
			// Jika tidak ada pesan error yang spesifik
			throw new Error('Terjadi kesalahan pada server');
		}
	}
	throw error;
};

export default handleApiError;
