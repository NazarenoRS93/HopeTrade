package is2.g57.hopetrade.dto;

public class IntercambioDTO {
    private Long id;
    private Long publicacionID;
    private Long ofertaID;
    private String observacion;
    private Long estadoID;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getPublicacionID() {
        return publicacionID;
    }
    public void setPublicacionID(Long publicacionID) {
        this.publicacionID = publicacionID;
    }
    public Long getOfertaID() {
        return ofertaID;
    }
    public void setOfertaID(Long ofertaID) {
        this.ofertaID = ofertaID;
    }
    public String getObservacion() {
        return observacion;
    }
    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }
    public Long getEstadoID() {
        return estadoID;
    }
    public void setEstadoID(Long estadoID) {
        this.estadoID = estadoID;
    }

    
}
