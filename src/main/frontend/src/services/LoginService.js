import axios from "axios";

const LOGIN_BASE_REST_API_URL = "http://localhost:8080/login";
 
 class LoginService{
	loginUser(form){
        let url = LOGIN_BASE_REST_API_URL+"/login-user/"+form.dni+"/"+form.pass;
		return axios.get(url);
	}

     loginAdmin(form){
         let url = LOGIN_BASE_REST_API_URL+"/login-administrativo/"+form.email+"/"+form.pass;
         return axios.get(url);
     }
 }
 
 export default new LoginService();