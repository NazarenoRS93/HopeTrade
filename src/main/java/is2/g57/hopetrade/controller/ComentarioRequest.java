package is2.g57.hopetrade.controller;

import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.RespuestaComentario;
import is2.g57.hopetrade.entity.User;

public class ComentarioRequest {
	private Long idComentario;
	private String text;
	private User user;
	private Publicacion publicacion;
	private RespuestaComentario respuesta;
	
	
	
	public Long getIdComentario() {
		return idComentario;
	}
	public void setIdComentario(Long idComentario) {
		this.idComentario = idComentario;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Publicacion getPublicacion() {
		return publicacion;
	}
	public void setPublicacion(Publicacion publicacion) {
		this.publicacion = publicacion;
	}
	public RespuestaComentario getRespuesta() {
		return respuesta;
	}
	public void setRespuesta(RespuestaComentario respuesta) {
		this.respuesta = respuesta;
	}
	
	
	
	
}
