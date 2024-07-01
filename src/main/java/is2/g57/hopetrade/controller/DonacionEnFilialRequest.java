package is2.g57.hopetrade.controller;


public class DonacionEnFilialRequest {
	private String dni_donante;
	private String nombre_completo_donante;
	private Long id_filial;
	private Long id_ayudante;
	private Long id_categoria;
    private String descripcion_donacion;
	private Integer cantidad;
	private Boolean es_dinero;


    public String getDni_donante() {
        return dni_donante;
    }
    public void setDni_donante(String dni_donante) {
        this.dni_donante = dni_donante;
    }

    public String getNombre_completo_donante() {
        return nombre_completo_donante;
    }
    public void setNombre_completo_donante(String nombre_completo_donante) {
        this.nombre_completo_donante = nombre_completo_donante;
    }

    public Long getId_filial() {
        return id_filial;
    }
    public void setId_filial(Long id_filial) {
        this.id_filial = id_filial;
    }

    public Long getId_ayudante() {
        return id_ayudante;
    }
    public void setId_ayudante(Long id_ayudante) {
        this.id_ayudante = id_ayudante;
    }

    public Long getId_categoria() {
        return id_categoria;
    }
    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getDescripcion_donacion() {
        return descripcion_donacion;
    }
    public void setDescripcion_donacion(String descripcion_donacion) {
        this.descripcion_donacion = descripcion_donacion;
    }

    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Boolean getEs_dinero() {
        return es_dinero;
    }
    public void setEs_dinero(Boolean es_dinero) {
        this.es_dinero = es_dinero;
    }

}
