import axios from 'axios';

const ChangePasswordService={
	
	updateUserPassword: async (userData) => {
        try {
            const response = await axios.post('/user/updatepassword', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },	
    
    updateAdminstrativoPassword: async (userData) => {
        try {
            const response = await axios.post('/ayudante/updatepassword', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },	
    
};
export default ChangePasswordService;