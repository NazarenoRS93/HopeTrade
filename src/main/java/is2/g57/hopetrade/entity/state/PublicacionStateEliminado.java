package is2.g57.hopetrade.entity.state;

import is2.g57.hopetrade.entity.Publicacion;
import jakarta.persistence.Entity;

@Entity
public class PublicacionStateEliminado extends PublicacionState {

    public PublicacionStateEliminado() {
        this.nombre = "Eliminado";
        this.id = 5L;
    }

    public void eliminar(Publicacion p) {
    }
    
}
