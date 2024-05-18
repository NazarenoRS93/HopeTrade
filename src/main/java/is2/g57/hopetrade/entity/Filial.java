package is2.g57.hopetrade.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name="filial")
public class Filial {
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	@Column(name="id_filial")
	private Long id;
	
	@Column(name="nombre", nullable = false, length=100)
	private String nombre;
	
	@Column(name="direccion", nullable = false, unique = true, length=150)
	private String direccion;
	
	@Column(name="email", nullable = false, length=100)
	private String email;
	
	 @OneToMany(mappedBy = "filial")
	 @JsonManagedReference
	  private List<Ayudante> ayudantes;

	public Filial(Long id, String nombre, String direccion, String email) {
		this.id = id;
		this.nombre = nombre;
		this.direccion = direccion;
		this.email = email;
		this.ayudantes = new ArrayList<Ayudante>();
	}

	public Filial(String nombre, String direccion, String email) {
		this.nombre = nombre;
		this.direccion = direccion;
		this.email = email;
		this.ayudantes = new ArrayList<Ayudante>();
	}

	public Filial() {
	}

	  @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        Filial filial = (Filial) o;
	        return Objects.equals(nombre, filial.nombre) &&
	                Objects.equals(direccion, filial.direccion);
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(nombre, direccion);
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

	public List<Ayudante> getAyudantes() {
		return ayudantes;
	}

	public void setAyudantes(List<Ayudante> ayudantes) {
		this.ayudantes = ayudantes;
	}
	
	
	
}
