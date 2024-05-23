import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/user";
const AYUDANTE_BASE_REST_API_URL = "http://localhost:8080/ayudante";

 class RegisterService{
     register(form){
         const cookie = window.localStorage.getItem("user");
         let formData = new FormData();
         //add three variable to form
         formdata.append("id", form.id);
         formdata.append("nombre", form.nombre);
         formdata.append("apellido", form.apellido);
         formdata.append("dni", form.dni);
         formdata.append("fecha_nacimiento", form.fecha_nacimiento);
         formdata.append("email", form.email);
         formdata.append("pass", form.pass);
         let url;
         if(cookie) {
             url = AYUDANTE_BASE_REST_API_URL+"/guardar";
         } else {
             url = USER_BASE_REST_API_URL+"/guardar";
         };
         return axios.post(url, formdata, { headers : {'Content-Type': 'application/json'}})
     }
 }
 
 export default new RegisterService();