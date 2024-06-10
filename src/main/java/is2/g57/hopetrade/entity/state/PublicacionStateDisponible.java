package is2.g57.hopetrade.entity.state;

import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.entity.Publicacion;
import jakarta.persistence.Entity;

@Entity
public class PublicacionStateDisponible extends PublicacionState {

    public PublicacionStateDisponible() {
        this.nombre = "Disponible";
        this.id = 1L;
    }

    public void editar (Publicacion p, PublicacionDTO pDTO) {
        p.update(pDTO);
        // si hay error en los datos, suspender()
    }
    public void ofertar (Publicacion p) {
        // agregar oferta
    }
    public void comentar(Publicacion p) {
        // agregar comentario
    }

    public void responderComentario(Publicacion p) {
        // responder comentario
    }

    public void aceptarOferta(Publicacion p) {
        // aceptar oferta
    }

    public void rechazarOferta(Publicacion p) {
        // rechazar oferta
    }

    public void reservar(Publicacion p) {
        p.setState(new PublicacionStateReservado());
    }

    public void suspender(Publicacion p) {
        p.setState(new PublicacionStateSuspendido());
    }
}
