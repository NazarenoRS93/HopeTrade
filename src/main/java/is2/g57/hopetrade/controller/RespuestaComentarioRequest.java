package is2.g57.hopetrade.controller;

import java.time.LocalDateTime;

import is2.g57.hopetrade.entity.Comentario;
import is2.g57.hopetrade.entity.User;

public class RespuestaComentarioRequest {
	private Long id;
	private String text;

	private Long idUser;
	private Long idComentario;
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

	public Long getUserId() {
		return idUser;
	}
	public void setUser(Long user) {
		this.idUser = user;
	}
	public Long getComentarioId() {
		return idComentario;
	}
	public void setComentario(Long comentario) {
		this.idComentario = comentario;
	}

	
	
}