package is2.g57.hopetrade.entity.state;

import is2.g57.hopetrade.entity.Publicacion;
import jakarta.persistence.Entity;

@Entity
public class PublicacionStateReservado extends PublicacionState {
    
    public PublicacionStateReservado() {
        this.nombre = "Reservado";
        this.id = 3L;
    }

    public void publicar(Publicacion p) {
        p.setState(new PublicacionStateDisponible());
    }

    public void confirmarIntercambio(Publicacion p) {
        p.setState(new PublicacionStateFinalizado());
    }
}
