package is2.g57.hopetrade.controller;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import is2.g57.hopetrade.entity.Publicacion;

public class PublicacionDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Long userID;
    private MultipartFile imageData;

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
    public MultipartFile getImageData() {
        return imageData;
    }
    public void setImageData(MultipartFile imageData) {
        this.imageData = imageData;
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
