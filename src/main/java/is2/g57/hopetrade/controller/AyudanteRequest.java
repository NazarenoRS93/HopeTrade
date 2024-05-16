package is2.g57.hopetrade.controller;

import java.time.LocalDate;

public class AyudanteRequest {

	private Long id_ayudante;
	private String dni;
    private String nombre;
    private String email;
    private String pass;
    private String apellido;
    

    // Getters y setters
    public String getDni() {
        return dni;
    }


    public void setDni(String dni) {

        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

	public Long getId_ayudante() {
		return id_ayudante;
	}

	public void setId_ayudante(Long id_ayudante) {
		this.id_ayudante = id_ayudante;
	}
}
