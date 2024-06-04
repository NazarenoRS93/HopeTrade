package is2.g57.hopetrade.entity.state;

import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.entity.Publicacion;
import jakarta.persistence.*;

@Entity
@Table(name = "publicacion_state")
public abstract class PublicacionState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    protected Long id;

    @Column(name = "name", nullable = false, unique = true)
    protected String nombre;

    public String getNombre() {
        return nombre;
    }
    public Long getId() {
        return id;
    }
    private String msgError() {
        return "Esta operación no está disponible en el estado actual (" + this.getNombre() + ")";
    }
    public void suspender(Publicacion p) {}
    public void editar(Publicacion p, PublicacionDTO pDTO) {}
    public void ofertar(Publicacion p) {}
    public void eliminar(Publicacion p) { 
        p.setState(new PublicacionStateEliminado());
    }
    public void comentar(Publicacion p) {}
    public void responderComentario(Publicacion p) {}

    public void aceptarOferta(Publicacion p) {}

    public void rechazarOferta(Publicacion p) {}

    public void confirmarIntercambio(Publicacion p) {}

}
