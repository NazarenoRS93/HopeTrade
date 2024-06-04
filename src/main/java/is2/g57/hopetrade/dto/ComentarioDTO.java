package is2.g57.hopetrade.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ComentarioDTO {
    private Long id_comentario;
    private Long id_Publicacion;
    private String texto;
    private LocalDateTime fecha_creacion;
    private LocalDateTime fecha_modificacion;
    private Long id_usuario;
    private String respuesta;

    // Getters and Setters

    public Long getId_comentario() {
        return id_comentario;
    }

    public void setId_comentario(Long id_comentario) {
        this.id_comentario = id_comentario;
    }

    public Long getId_Publicacion() {
        return id_Publicacion;
    }

    public void setId_Publicacion(Long id_Publicacion) {
        this.id_Publicacion = id_Publicacion;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public LocalDateTime getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(LocalDateTime fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public LocalDateTime getFecha_modificacion() {
        return fecha_modificacion;
    }

    public void setFecha_modificacion(LocalDateTime fecha_modificacion) {
        this.fecha_modificacion = fecha_modificacion;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
}
