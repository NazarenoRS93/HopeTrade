 import axios from "axios";
 
 const LOGIN_BASE_REST_API_URL = "http://localhost:8080/login";
 
 class LoginService{
	loginUser(form){
        let url = LOGIN_BASE_REST_API_URL+"/login-user/"+form.dni+"/"+form.pass;
		return axios.get(url);
	}

     loginAdmin(form){
         return axios.get(`${LOGIN_BASE_REST_API_URL}/login-administrativo/${form.email}/${form.pass}`);
     }
 }
 
 export default new LoginService();