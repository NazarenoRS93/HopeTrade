package is2.g57.hopetrade.entity;

import javax.persistence.*;

@Entity
@Table(name="filial")
public class Filial {
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length=100)
	private String nombre;
	
	@Column(nullable = false, length=150)
	private String direccion;
	
	@Column(nullable = false, length=100)
	private String email;

	public Filial(Long id, String nombre, String direccion, String email) {
		this.id = id;
		this.nombre = nombre;
		this.direccion = direccion;
		this.email = email;
	}

	public Filial(String nombre, String direccion, String email) {
		this.nombre = nombre;
		this.direccion = direccion;
		this.email = email;
	}

	public Filial() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
