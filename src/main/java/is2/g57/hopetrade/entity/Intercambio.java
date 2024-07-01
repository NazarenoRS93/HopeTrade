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

    @OneToOne
    @JoinColumn(name = "id_publicacion", unique = true)
    private Publicacion publicacion;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_oferta", unique = true)
    private Oferta oferta;

    @Column(name="observacion")
    private String observacion;

    @Column(name="estado")
    private String estado;

//     @ManyToOne (cascade = CascadeType.DETACH)
//     @JoinColumn(name = "ID_ESTADO")
//    IntercambioState estado;
//     ESTADOS POSIBLES: PROGRAMADO, FINALIZADO, CANCELADO
//     Hay que pensar si hace falta implementar state para esto o con un String alcanza

    public Intercambio() {}
    
    

    public Intercambio(Publicacion publicacion, Oferta oferta) {
		this.publicacion = publicacion;
		this.oferta = oferta;
		this.estado = "PROGRAMADO";
	}



	public Publicacion getPublicacion() {
        return publicacion;
    }

    public void setPublicacion(Publicacion publicacion) {
        this.publicacion = publicacion;
    }

    public Oferta getOferta() {
        return oferta;
    }

   public void setOferta(Oferta oferta) {
        this.oferta = oferta;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public Long getId() {
        return id;
    }

    public void setEstado(String estado) {
        this.estado = estado;  
    }

    public String getEstado() {
        return estado;
    }

    public void confirmar() {
        this.estado = "FINALIZADO";
    }

    public void cancelar() {
        this.estado = "CANCELADO";
    }
}
