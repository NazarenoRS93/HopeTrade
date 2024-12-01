import axios from 'axios';

const UpdateProfileService = {
    getUserById: async (id) => {
        try {
            const response = await axios.get(`/user/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserProfile: async (userData) => {
        try {
            const response = await axios.post('/user/updateProfile', userData);
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
    
    updateAdministrativoProfile: async (userData) => {
        try {
            const response = await axios.post('/ayudante/actualizar', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default UpdateProfileService;
