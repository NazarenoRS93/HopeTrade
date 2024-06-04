package is2.g57.hopetrade.controller;

import java.time.LocalDateTime;

import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;

public class OfertaRequest {
	private Long id;
	private String texto;
	private LocalDateTime fechaCreacion;
	private LocalDateTime fechaModificacion;
	private String respuesta;
	private LocalDateTime fechaIntercambio;
	private boolean estado;
	private String imagenUrl;
	private Publicacion Publicacion;
	private Filial Filial;
	private User User;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public LocalDateTime getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(LocalDateTime fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public LocalDateTime getFechaModificacion() {
		return fechaModificacion;
	}

	public void setFechaModificacion(LocalDateTime fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
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

	public boolean isEstado() {
		return estado;
	}

	public void setEstado(boolean estado) {
		this.estado = estado;
	}

	public String getImagenUrl() {
		return imagenUrl;
	}

	public void setImagenUrl(String imagenUrl) {
		this.imagenUrl = imagenUrl;
	}

	public Publicacion getPublicacion() {
		return Publicacion;
	}

	public void setPublicacion(Publicacion publicacion) {
		Publicacion = publicacion;
	}

	public Filial getFilial() {
		return Filial;
	}

	public void setFilial(Filial filial) {
		Filial = filial;
	}

	public User getUser() {
		return User;
	}

	public void setUser(User user) {
		User = user;
	}



}