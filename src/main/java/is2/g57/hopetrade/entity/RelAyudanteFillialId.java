package is2.g57.hopetrade.entity;

import javax.persistence.Embeddable;

@Embeddable
public class RelAyudanteFillialId {
	private Long idAyudante;

    private Long idFillial;

    public RelAyudanteFillialId() {
    }

    public RelAyudanteFillialId(Long idAyudante, Long idFillial) {
        this.idAyudante = idAyudante;
        this.idFillial = idFillial;
    }

	public Long getIdAyudante() {
		return idAyudante;
	}

	public void setIdAyudante(Long idAyudante) {
		this.idAyudante = idAyudante;
	}

	public Long getIdFillial() {
		return idFillial;
	}

	public void setIdFillial(Long idFillial) {
		this.idFillial = idFillial;
	}
    
    
}
