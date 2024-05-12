package is2.g57.hopetrade.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "usuario", uniqueConstraints = {@UniqueConstraint(columnNames = {"dni", "mail"})})

public class User implements Serializable{

	private static final long serialVersionUID = -7597079625316159690L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length=100)
    private String mail;
    
    @Column(length=100)
    private String nombre;
    
    @Column(length=100)
    private String apellido;
    
    @Column(length = 15, unique = true)
    private String dni;
    
    @Column(length=50)
    private String contraseña;
    private Date fechaNacimiento;
    private boolean activo; 

    // Constructores, getters y setters
    

    public Long getId() {
        return id;
    }

    public User(Long id, String mail, String nombre, String apellido, String dni, String contraseña,
			Date fechaNacimiento, boolean activo) {
		this.id = id;
		this.mail = mail;
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
		this.contraseña = contraseña;
		this.fechaNacimiento = fechaNacimiento;
		this.activo = activo;
	}
    
    
	public User(String mail, String nombre, String apellido, String dni, String contraseña, Date fechaNacimiento,
			boolean activo) {
		this.mail = mail;
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
		this.contraseña = contraseña;
		this.fechaNacimiento = fechaNacimiento;
		this.activo = activo;
	}
	

	public User() {
	}

	public void setId(Long id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
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

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public boolean isActivo() { // Agregar el getter para activo
        return activo;
    }

    public void setActivo(boolean activo) { // Agregar el setter para activo
        this.activo = activo;
    }
}
