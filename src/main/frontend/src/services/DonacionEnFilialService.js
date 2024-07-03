import axios from "axios";
import { defaultGateway } from "../utils/utilConstants";

const REGISTRAR_DONACION_PRESENCIAL_REST_API_URL = defaultGateway + '/donacion-presencial';

class DonacionEnFilialService {
    registrarDonacionEnFilial(form) {
        const sCookie = window.localStorage.getItem("user");
        let nIdUsuario = (sCookie) ? JSON.parse(sCookie).idUser : null;
        let nIdFilial = (sCookie) ? JSON.parse(sCookie).filial : null;
        let formdata = new FormData();
        formdata.append("dni_donante", form.dni_donante);
        formdata.append("nombre_completo_donante", form.nombre_completo_donante);
        formdata.append("id_categoria", form.id_categoria);
        formdata.append("descripcion_donacion", form.descripcion_donacion);
        formdata.append("cantidad", form.cantidad);
        formdata.append("es_dinero", form.es_dinero);
        formdata.append("id_ayudante", nIdUsuario);
        formdata.append("id_filial", nIdFilial);
        let url = REGISTRAR_DONACION_PRESENCIAL_REST_API_URL + "/guardar";
        return axios.post(url, formdata, { headers : {'Content-Type': 'application/json'}})
    }
}

export default new DonacionEnFilialService();
