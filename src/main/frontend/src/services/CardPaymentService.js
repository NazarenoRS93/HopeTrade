import axios from "axios";
import { defaultGateway } from "../utils/utilConstants";

const REGISTRAR_DONACION_REST_API_URL = defaultGateway + '/donacion';

class CardPaymentService {
    registrarPagoTarjeta(form) {
        const sCookie = window.localStorage.getItem("user");
        let nIdUsuario = (sCookie) ? JSON.parse(sCookie).idUser : null;
        let formdata = new FormData();
        formdata.append("numero", form.numero);
        formdata.append("nombre_titular", form.nombre_titular);
        // Se convierte a tipo Date la fecha para no tener problemas más adelante
        let dtFechaVto = new Date(form.fecha_vencimiento);    //form.fecha_vencimiento.toDate();
        // Dado que la selección es solo mes y año, se reemplaza el día que trae la fecha por 01
        formdata.append("fecha_vencimiento", dtFechaVto.setDate(1));
        formdata.append("dni_titular", form.dni_titular);
        formdata.append("codigo", form.codigo);
        formdata.append("monto", form.monto);
        formdata.append("id_usuario", nIdUsuario);
        let url = REGISTRAR_DONACION_REST_API_URL + "/pago-tarjeta";
        return axios.post(url, formdata, { headers : {'Content-Type': 'application/json'}})
    }
}

export default new CardPaymentService();
