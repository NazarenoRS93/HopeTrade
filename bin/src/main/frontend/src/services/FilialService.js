import axios from "axios";

const FILIAL_BASE_REST_API_URL = "http://localhost:8080/filial";

class FilialService {
    register(form) {
        let formdata = new FormData();
        // add three variables to form
        formdata.append("id", form.id);
        const url = FILIAL_BASE_REST_API_URL + "/ingresar-ayudante";
        return axios.post(url, formdata, { headers: { 'Content-Type': 'application/json' } });
    }

    selectFilial(idAyudante, idFilial) {
        const url = `${FILIAL_BASE_REST_API_URL}/ingresar-ayudante/${idAyudante}/${idFilial}`;
        return axios.post(url, {}, { headers: { 'Content-Type': 'application/json' } });
    }
}

export default new FilialService();
