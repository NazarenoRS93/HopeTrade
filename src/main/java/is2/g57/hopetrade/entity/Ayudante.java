package is2.g57.hopetrade.entity;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "ayudante", uniqueConstraints = {@UniqueConstraint(columnNames = {"id_ayudante"})})
public class Ayudante {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_ayudante")
	private Long id_ayudante;
	
	@Column(name = "email", nullable= false, unique= true, length= 100)
	private String email;
	
	@Column(name = "dni", nullable = false, unique = true, length=100)
	private String dni;
	
	@Column(name = "pass", nullable = false, length = 50)
	private String pass;
	
	@Column(name = "nombre", nullable= false, length = 100)
	private String nombre;
	
	@Column(name ="apellido",  nullable= false, length=100)
	private String apellido;
	
	@Column(name = "activo")
	private boolean activo;
	
	    @ManyToOne
	    @JoinColumn(name = "filial_id")
	    @JsonBackReference
	    private Filial filial;

	
	
	public Ayudante(Long id, String email, String dni, String pass, String nombre, String apellido) {
		this.id_ayudante = id;
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
	
	   @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        Ayudante ayudante = (Ayudante) o;
	        return Objects.equals(email, ayudante.email) &&
	                Objects.equals(dni, ayudante.dni);
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(email, dni);
	    }
	
	    
	    

	public Filial getFilial() {
			return filial;
		}

		public void setFilial(Filial filial) {
			this.filial = filial;
		}

	public Long getId() {
		return this.id_ayudante;
	}

	public void setId(Long id) {
		this.id_ayudante = id;
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
	
	public boolean isAdmin() {
		return (this.getEmail().equals("admin@caritas.com") && this.getPass().equals("admin"));
	}
	
}
