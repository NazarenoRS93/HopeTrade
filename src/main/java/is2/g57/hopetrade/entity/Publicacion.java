package is2.g57.hopetrade.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.services.ImageService;
import is2.g57.hopetrade.entity.state.*;

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

    @ManyToOne (cascade = CascadeType.DETACH)
    @JoinColumn(name = "ID_CATEGORIA")
    private Categoria categoria;
    
    @Column(name="active")
    private boolean active;

    @ManyToOne (cascade = CascadeType.DETACH)
    @JoinColumn(name = "ID_ESTADO")
    private PublicacionState state;
    
    @Column(name="imagen_url")
    private String imagenUrl;

    // Uso LocalDateTime en lugar de Date porque tiene hh-mm-ss ademas de fecha
    @Column(name="fecha_hora_creacion")
    private LocalDateTime fechaHoraCreacion;
    @Column(name="ultimaModificacion")
    private LocalDateTime ultimaModificacion;
    
     @OneToMany(mappedBy = "publicacion", cascade = CascadeType.ALL, orphanRemoval = true)
	 @JsonManagedReference
	   private List<Oferta> ofertas;
    
    
    // Constructores
    public Publicacion() {
        this.fechaHoraCreacion = java.time.LocalDateTime.now();
        this.ultimaModificacion = java.time.LocalDateTime.now();
        this.active = true;
		this.ofertas = new ArrayList<Oferta>();
    }

    public Publicacion(PublicacionDTO publicacionDTO) {
        this.userID = publicacionDTO.getUserID();
        this.titulo = publicacionDTO.getTitulo();
        this.descripcion = publicacionDTO.getDescripcion();
        this.fechaHoraCreacion = java.time.LocalDateTime.now();
        this.ultimaModificacion = java.time.LocalDateTime.now();
        this.active = true;
        this.setState(new PublicacionStateDisponible());
        this.ofertas = new ArrayList<Oferta>();	
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Publicacion that = (Publicacion) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(titulo, that.titulo) &&
                Objects.equals(userID, that.userID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titulo, descripcion, userID, categoria_id, active, imagenUrl, fechaHoraCreacion, ultimaModificacion);
    }

    // Metodos varios

    public void update(PublicacionDTO publicacionDTO) {
        if (publicacionDTO.getTitulo() != null) this.titulo = publicacionDTO.getTitulo();
        if (publicacionDTO.getDescripcion() != null) this.descripcion = publicacionDTO.getDescripcion();
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

    public String getImagenUrl(){
        return imagenUrl;
    }

    public void setImagenUrl(String imagenStr){
        this.imagenUrl = imagenStr;
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

    public LocalDateTime getUltimaModificacion() {
        return this.ultimaModificacion;
    }

    // Convertir a Date si es necesario
    public Date getFechaCreacion() {
        return java.util.Date.from(fechaHoraCreacion.atZone(ZoneId.systemDefault())
      .toInstant());
    }

    public boolean isActivo() {
        if (this.getState().getNombre().equals("Disponible")) {
            return true;
        }
        if (this.getState().getNombre().equals("Reservada")) {
            return true;
        }
        return false;
    }

    public void setUserID(long i) {
        this.userID = i;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public PublicacionState getState(){
        return state;
    }

    public void setState(PublicacionState state){
        this.state = state;
    }

}