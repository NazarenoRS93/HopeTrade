package is2.g57.hopetrade.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

import is2.g57.hopetrade.controller.PublicacionDTO;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "publicacion", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Publicacion implements Serializable{
    // Relevante para cosas de compatibilidad. Dudo que sea necesario porque podemos resetear la base cuando haga falta
	private static final long serialVersionUID = -7597079625316159690L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
    private Long id;

    @Column(name="titulo", length = 50)
    private String titulo;

    @Column(name="descripcion", length = 240)
    private String descripcion;

    // Referencia al usuario creador
    
    @Column(name="userid")
    private Long userID;
    
    @Column(name="active")
    private boolean active;
    
    private String imageURL;
    // Lo abstraigo para implementar en otro momento

    // Uso LocalDateTime en lugar de Date porque tiene hh-mm-ss ademas de fecha
    @Column(name="fecha_hora_creacion")
    private LocalDateTime fechaHoraCreacion;
    @Column(name="ultimaModificacion")
    private LocalDateTime ultimaModificacion;
    // Constructores

    // Id recibido
    public Publicacion(Long id, Long userID, String titulo, String descripcion){
        this.id = id;
        this.userID = userID;
        this.titulo = titulo;
        this.descripcion = descripcion;
        // this.imagen = imagen;
        this.fechaHoraCreacion = java.time.LocalDateTime.now();
        this.active = true;
    }

    // Id generado por base de datos
    public Publicacion(Long userID, String titulo, String descripcion){
        this.userID = userID;
        this.titulo = titulo;
        this.descripcion = descripcion;
        // this.imagen = imagen;
        this.fechaHoraCreacion = java.time.LocalDateTime.now();
        this.ultimaModificacion = java.time.LocalDateTime.now();
    }


    public Publicacion() {
        this.fechaHoraCreacion = java.time.LocalDateTime.now();
        this.ultimaModificacion = java.time.LocalDateTime.now();
        this.active = true;
    }

    public Publicacion(PublicacionDTO publicacionRequest) {
        this.userID = publicacionRequest.getUserID();
        this.titulo = publicacionRequest.getTitulo();
        this.descripcion = publicacionRequest.getDescripcion();
        
        this.fechaHoraCreacion = java.time.LocalDateTime.now();
        this.ultimaModificacion = java.time.LocalDateTime.now();
        this.active = true;
    }

    // Metodos varios

    public void update(PublicacionDTO publicacionRequest) {
        this.titulo = publicacionRequest.getTitulo();
        this.descripcion = publicacionRequest.getDescripcion();

        this.ultimaModificacion = java.time.LocalDateTime.now();
    }

    public void desactivar(){
        this.active = false;
    }

    public void activar(){
        this.active = true;
    }

    public void eliminarPublicacion(){
        this.active = false;
    }

    // Setters y Getters

    public String getImageURL(){
        return imageURL;
    }

    public void setImageURL(String imageURL){
        this.imageURL = imageURL;
    }

    public Long getId() {
        return id;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getTitulo() {
        return this.titulo;
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

    public LocalDateTime getFechaHoraCreacion() {
        return this.fechaHoraCreacion;
    }

    // Convertir a Date si es necesario
    public Date getFechaCreacion() {
        return java.util.Date.from(fechaHoraCreacion.atZone(ZoneId.systemDefault())
      .toInstant());
    }

    public boolean isActivo() {
        return this.active;
    }

    public void setUserID(long i) {
        this.userID = i;
    }

}