package is2.g57.hopetrade.controller;

//Clase LoginResponse:
//Define la estructura de la respuesta para el método de login, incluyendo todos los campos requeridos y los mensajes de error apropiados.

public class LoginResponse {
	
	private String dni;
	private Long id;
	private Boolean active;
	private String responseMsg;
	private String nombre;
	private String apellido;
	private Integer tipo;

	public LoginResponse(String dni, Long id, Boolean active, String responseMsg, String nombre, String apellido,
			Integer tipo) {
		this.dni = dni;
		this.id = id;
		this.active = active;
		this.responseMsg = responseMsg;
		this.nombre = nombre;
		this.apellido = apellido;
		this.tipo = tipo;
	}

	// Getters y setters
	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getResponseMsg() {
		return responseMsg;
	}

	public void setResponseMsg(String responseMsg) {
		this.responseMsg = responseMsg;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public Integer getTipo() {
		return tipo;
	}

	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}

}
