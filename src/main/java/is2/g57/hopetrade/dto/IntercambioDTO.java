package is2.g57.hopetrade.dto;

public class IntercambioDTO {
    private Long id;
    private PublicacionDTO publicacion;
    private OfertaDTO oferta;
    private String observacion;
    private Long estadoID;
    private String estado;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public PublicacionDTO getPublicacion() {
        return publicacion;
    }
    public void setPublicacion(PublicacionDTO publicacion) {
        this.publicacion = publicacion;
    }
    public OfertaDTO getOferta() {
        return oferta;
    }
    public void setOferta(OfertaDTO oferta) {
        this.oferta = oferta;
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

    public void setEstado(String estado){
        this.estado = estado;
    }

    public String getEstado() {
        return estado;
    }

    
}
