package is2.g57.hopetrade.dto;

import java.time.LocalDateTime;

public class PublicacionDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Long userID;
    private String imagen;
    private String categoria_nombre;
    private long categoria_id;
    private boolean active;
    private LocalDateTime fechaHoraCreacion;
    private LocalDateTime ultimaModificacion;
    private String estado;
    private Long estadoID;
    private Integer ofertas;
    private String userFullName;
    private Integer comentarios;

    public boolean getActive() { return active; }
    public LocalDateTime getFechaHoraCreacion() {
        return fechaHoraCreacion;
    }
    public LocalDateTime getUltimaModificacion() {
        return ultimaModificacion;
    }
    public void setActive(boolean active) {
        this.active = active;
    }
    public void setFechaHoraCreacion(LocalDateTime fechaHoraCreacion) {
        this.fechaHoraCreacion = fechaHoraCreacion;
    }
    public void setUltimaModificacion(LocalDateTime ultimaModificacion) {
        this.ultimaModificacion = ultimaModificacion;
    }
    public String getImagen() {
        return imagen;
    }
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {  
        this.titulo = titulo;
    }

    public String getDescripcion() {    
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public Long getUserID() {
        return userID;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setUserID(Long userID) {
        this.userID = userID;
    }  

    public void setCategoria_ID(Long categoria_id) {
        this.categoria_id = categoria_id;
    }
    public Long getCategoria_ID() {
        return categoria_id;
    }
    public String getCategoria_Nombre() {
        return categoria_nombre;
    }
    public void setCategoria_Nombre(String categoria_nombre) {
        this.categoria_nombre = categoria_nombre;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstadoID(Long estadoID) {
        this.estadoID = estadoID;
    }
    public Long getEstadoID() {
        return estadoID;
    }
    public void setOfertas(Integer ofertas) {
        this.ofertas = ofertas;
    }
    public Integer getOfertas() {
        return ofertas;
    }

    public String getUserFullName() {
        return userFullName;
    }
    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }
	public Integer getComentarios() {
		return comentarios;
	}
	public void setComentarios(Integer comentarios) {
		this.comentarios = comentarios;
	}
    
    
}
