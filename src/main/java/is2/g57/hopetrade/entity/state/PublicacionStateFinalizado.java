package is2.g57.hopetrade.entity.state;

import is2.g57.hopetrade.entity.Publicacion;
import jakarta.persistence.Entity;

@Entity
public class PublicacionStateFinalizado extends PublicacionState {

    public PublicacionStateFinalizado() {
        this.nombre = "Finalizado";
        this.id = 4L;
    }

    public void eliminar(Publicacion p) {}
    
}
