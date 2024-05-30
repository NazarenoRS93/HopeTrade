package is2.g57.hopetrade.entity.state;

import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.entity.Publicacion;
import jakarta.persistence.Entity;

@Entity
public class PublicacionStateSuspendido extends PublicacionState {

    public PublicacionStateSuspendido() {
        this.nombre = "Suspendido";
        this.id = 2L;
    }
    
    public void editar(Publicacion p, PublicacionDTO pDTO) {
        p.update(pDTO);

        // si los datos son correctos, publicar()
    }

    public void publicar(Publicacion p) {
        p.setState(new PublicacionStateDisponible());
    }
}
