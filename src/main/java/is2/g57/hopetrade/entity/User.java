package is2.g57.hopetrade.entity;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "usuario" )
public class User {
	
	private static final long serialVersionUID = -7597079625316159690L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "id_usuario")
	private Long id;
	
	@Column(name = "email", nullable = false, unique=true, length=100)
	private String email;
	
	@Column(name = "dni", nullable = false, unique = false, length = 15)
	private String dni;
	
	@Column(name="pass", nullable = false, length = 50)
	private String pass;
	
	@Column(name="nombre", nullable = false, length = 100)
	private String nombre;
	
	@Column(name="apellido", nullable = false, length=100)
	private String apellido;
	
	@Column(name="fecha_nacimiento", nullable = false)
	private Date fecha_nacimiento;
	private boolean activo;
	
	public User(Long id, String email, String dni, String pass, String nombre, String apellido, Date fecha_nacimiento) {
		this.id = id;
		this.email = email;
		this.dni = dni;
		this.pass = pass;
		this.nombre = nombre;
		this.apellido = apellido;
		this.fecha_nacimiento = fecha_nacimiento;
		this.activo = true;
	}

	public User(String email, String dni, String pass, String nombre, String apellido, Date fecha_nacimiento) {
		this.email = email;
		this.dni = dni;
		this.pass = pass;
		this.nombre = nombre;
		this.apellido = apellido;
		this.fecha_nacimiento = fecha_nacimiento;
		this.activo = true;
	}

	public User() {
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

	public Date getFecha_nacimiento() {
		return fecha_nacimiento;
	}

	public void setFecha_nacimiento(Date fecha_nacimiento) {
		this.fecha_nacimiento = fecha_nacimiento;
	}

	public boolean isActivo() {
		return activo;
	}

	public void setActivo(boolean activo) {
		this.activo = activo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	
}
