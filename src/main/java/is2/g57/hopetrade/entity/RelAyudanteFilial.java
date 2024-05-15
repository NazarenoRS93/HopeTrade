package is2.g57.hopetrade.entity;

import java.util.Date;

import jakarta.persistence.*;

import jakarta.persistence.MapsId;

@Entity
@Table(name = "rel_ayudante_filial")
public class RelAyudanteFilial {
	@EmbeddedId
    private RelAyudanteFillialId id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idAyudante")
    private Ayudante ayudante;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idFillial")
    private Filial fillial;

    @Column(nullable = false)
    private Date fecha;

    public RelAyudanteFilial() {
    }

    public RelAyudanteFilial(Ayudante ayudante, Filial fillial, Date fecha) {
        this.ayudante = ayudante;
        this.fillial = fillial;
        this.fecha = fecha;
        this.id = new RelAyudanteFillialId(ayudante.getId(), fillial.getId());
    }

	public RelAyudanteFillialId getId() {
		return id;
	}

	public void setId(RelAyudanteFillialId id) {
		this.id = id;
	}

	public Ayudante getAyudante() {
		return ayudante;
	}

	public void setAyudante(Ayudante ayudante) {
		this.ayudante = ayudante;
	}

	public Filial getFillial() {
		return fillial;
	}

	public void setFillial(Filial fillial) {
		this.fillial = fillial;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
    
    
}
