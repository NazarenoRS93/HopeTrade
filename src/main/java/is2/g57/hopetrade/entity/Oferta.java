package is2.g57.hopetrade.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "oferta")
public class Oferta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oferta")
    private Long id;

    @Column(name = "titulo", nullable = false, length = 50)
    private String titulo;

    @Column(name = "descripcion", nullable = false, length = 250)
    private String descripcion;

    @Column(name = "creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "respuesta", length = 250)
    private String respuesta;

    @Column(name = "fecha_intercambio", nullable = false)
    private LocalDateTime fechaIntercambio;

    @Column(name = "estado")
    private String estado;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @ManyToOne
    @JoinColumn(name = "publicacion_id")
    @JsonBackReference
    private Publicacion publicacion;

    @ManyToOne
    @JoinColumn(name = "filial_id")
    @JsonBackReference
    private Filial filial;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public Oferta(String texto, LocalDateTime fechaIntercambio, String imagenUrl, Publicacion publicacion, Filial filial, User user) {
        this.descripcion = texto;
        this.fechaCreacion = LocalDateTime.now();
        this.fechaIntercambio = fechaIntercambio;
        this.imagenUrl = imagenUrl;
        this.publicacion = publicacion;
        this.filial = filial;
        this.user = user;
        this.estado= "ACTIVA";
    }

    public Oferta() { 
        this.fechaCreacion = LocalDateTime.now();
        this.estado= "ACTIVA";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public LocalDateTime getFechaIntercambio() {
        return fechaIntercambio;
    }

    public void setFechaIntercambio(LocalDateTime fechaIntercambio) {
        this.fechaIntercambio = fechaIntercambio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public Publicacion getPublicacion() {
        return publicacion;
    }

    public void setPublicacion(Publicacion publicacion) {
        this.publicacion = publicacion;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void archivar() {
        this.estado = "ARCHIVADA";
    }

    public void rechazar() {
        this.estado = "RECHAZADA";
    }

    public void aceptar() {
        this.estado = "ACEPTADA";
    }

    public void eliminar() {
        this.estado = "ELIMINADA";
    }
}
