package is2.g57.hopetrade.entity;

import javax.persistence.*;

@Entity
@Table(name = "ayudante")
public class Ayudante {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable= false, unique= true, length= 100)
	private String email;
	
	@Column(nullable = false, unique = true, length=100)
	private String dni;
	
	@Column(nullable = false, length = 50)
	private String pass;
	
	@Column(nullable= false, length = 100)
	private String nombre;
	
	@Column(nullable= false, length=100)
	private String apellido;
	private boolean activo;
	
	public Ayudante(Long id, String email, String dni, String pass, String nombre, String apellido) {
		this.id = id;
		this.email = email;
		this.dni = dni;
		this.pass = pass;
		this.nombre = nombre;
		this.apellido = apellido;
		this.activo = true;
	}

	public Ayudante(String email, String dni, String pass, String nombre, String apellido) {
		this.email = email;
		this.dni = dni;
		this.pass = pass;
		this.nombre = nombre;
		this.apellido = apellido;
		this.activo = true;
	}

	public Ayudante() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	
	
	
}
