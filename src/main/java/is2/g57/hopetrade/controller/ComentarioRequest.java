package is2.g57.hopetrade.controller;

import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.RespuestaComentario;
import is2.g57.hopetrade.entity.User;

public class ComentarioRequest {
	private Long idComentario;
	private String text;
	private Long userId;
	private Long publicacionId;

	
	
	
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
	public Long getUserId() {
		return userId;
	}
	public void setUser(Long user) {
		this.userId = user;
	}
	public Long getPublicacionId() {
		return publicacionId;
	}
	public void setPublicacion(Long publicacion) {
		this.publicacionId = publicacion;
	}

	
	
	
}
