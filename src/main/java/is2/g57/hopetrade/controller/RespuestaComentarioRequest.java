package is2.g57.hopetrade.controller;

import java.time.LocalDateTime;

import is2.g57.hopetrade.entity.Comentario;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;

public class RespuestaComentarioRequest {
	private Long id;
	private String text;
	private LocalDateTime fechaRespuesta;
	private User user;
	private Comentario comentario;
	private Publicacion publicacion;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public LocalDateTime getFechaRespuesta() {
		return fechaRespuesta;
	}
	public void setFechaRespuesta(LocalDateTime fechaRespuesta) {
		this.fechaRespuesta = fechaRespuesta;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Comentario getComentario() {
		return comentario;
	}
	public void setComentario(Comentario comentario) {
		this.comentario = comentario;
	}
	public Publicacion getPublicacion() {
		return publicacion;
	}
	public void setPublicacion(Publicacion publicacion) {
		this.publicacion = publicacion;
	}

	
	
}
