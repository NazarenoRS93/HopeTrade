package is2.g57.hopetrade.controller;

import java.time.LocalDateTime;

import is2.g57.hopetrade.entity.Publicacion;

public class PublicacionDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Long userID;
    private String image;

    private boolean active;
    private LocalDateTime fechaHoraCreacion;
    private LocalDateTime ultimaModificacion;

    public void setActive(boolean active) {
        this.active = active;
    }
    public void setFechaHoraCreacion(LocalDateTime fechaHoraCreacion) {
        this.fechaHoraCreacion = fechaHoraCreacion;
    }
    public void setUltimaModificacion(LocalDateTime ultimaModificacion) {
        this.ultimaModificacion = ultimaModificacion;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
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

    
}
