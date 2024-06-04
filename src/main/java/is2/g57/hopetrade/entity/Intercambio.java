package is2.g57.hopetrade.entity;
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "intercambio", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Intercambio implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
    private Long id;

    @Column(name="id_publicacion")
    private Long publicacionID;

    // @JoinColumn(name = "id_oferta")
    // private Oferta oferta;

    @Column(name="observacion")
    private String observacion;

    // @ManyToOne (cascade = CascadeType.DETACH)
    // @JoinColumn(name = "ID_ESTADO")
    // IntercambioState estado;
    // ESTADOS POSIBLES: PROGRAMADO, FINALIZADO, CANCELADO
    // Hay que pensar si hace falta implementar state para esto o con un String alcanza

    public Intercambio() {}

    public Long getPublicacionID() {
        return publicacionID;
    }

    public void setPublicacionID(Long publicacionID) {
        this.publicacionID = publicacionID;
    }

    //public Oferta getOferta() {
    //    return oferta;
    //}

    //public void setOferta(Oferta oferta) {
    //    this.oferta = oferta;
    //}

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public Long getId() {
        return id;
    }
}
