 import axios from "axios";
 
 const AYUDANTE_BASE_REST_API_URL = "http://localhost:8080/ayudante/listar-ayudantes";
 
 class AyudanteService{
	getAllAyudantes(){
		return axios.get(AYUDANTE_BASE_REST_API_URL);
	}
 }
 
 export default new AyudanteService();