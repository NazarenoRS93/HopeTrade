package is2.g57.hopetrade.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "ayudante", uniqueConstraints = {@UniqueConstraint(columnNames = {"dni", "mail"})})

public class Ayudante {
	private static final long serialVersionUID = -7597079625316159690L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 100)
	private String email;
	
	@Column(length = 15)
	private String dni;
	
	@Column(length = 50)
	private String pass;
	
	@Column(length = 100)
	private String nombre;
	
	@Column(length = 100)
	private String apellido;
	private boolean activo;
	private Long id_filial;
	
	public Ayudante(Long id, String email, String dni, String pass, String nombre, String apellido, boolean activo) {
		this.id = id;
		this.email = email;
		this.dni = dni;
		this.pass = pass;
		this.nombre = nombre;
		this.apellido = apellido;
		this.activo = activo;
	}

	public Ayudante(String email, String dni, String pass, String nombre, String apellido, boolean activo) {
		this.email = email;
		this.dni = dni;
		this.pass = pass;
		this.nombre = nombre;
		this.apellido = apellido;
		this.activo = activo;
	}

	public Ayudante() {
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
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

	public boolean isActivo() {
		return activo;
	}

	public void setActivo(boolean activo) {
		this.activo = activo;
	}

	public Long getId_filial() {
		return id_filial;
	}

	public void setId_filial(Long id_filial) {
		this.id_filial = id_filial;
	}
	
	
}
