import axios from 'axios';
import { defaultGateway } from "../utils/utilConstants"

const FILIAL_BASE_REST_API_URL = "http://localhost:8080";

const DonacionesService = {
	getDonacionesEnFilial: async () => {
		try {
			const response = await axios.get(FILIAL_BASE_REST_API_URL + '/donacion-presencial/all');
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getDonacionesTarjeta: async () => {
		try {
			const response = await axios.get(FILIAL_BASE_REST_API_URL + '/donacion/all');
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getNombreAyudante: async () => {
		try {
			const response = await axios.get(FILIAL_BASE_REST_API_URL + '/ayudante/all');
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getUserById: async (id) => {
		try {
			const response = await axios.get(`/user/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	
	getAdministrativoById: async (id) => {
		try {
			const response = await axios.get(`/ayudante/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default DonacionesService;
