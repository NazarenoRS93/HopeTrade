package is2.g57.hopetrade.dto;

import java.time.LocalDateTime;

import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.controller.OfertaController;

public class OfertaDTO {
	private Long id;
	private String titulo;
	private String descripcion;
	private LocalDateTime fechaCreacion;
	private LocalDateTime fechaModificacion;
	private String respuesta;
	private LocalDateTime fechaIntercambio;
	private boolean estado;
	private String imagen;
	private Long publicacionId;
	private Long filialId;
	private String filialNombre;
	private Long userId;
	private String userFullName;

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

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagenUrl) {
		this.imagen = imagenUrl;
	}

	public Long getPublicacionId() {
		return publicacionId;
	}

	public void setPublicacionId(Long publicacionId) {
		this.publicacionId = publicacionId;
	}

	public Long getFilialId() {
		return filialId;
	}

	public void setFilialId(Long filialId) {
		this.filialId = filialId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserFullName() {
		return userFullName;
	}

	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}

	public String getFilialNombre() {
		return filialNombre;
	}

	public void setFilialNombre(String filialNombre) {
		this.filialNombre = filialNombre;
	}

}