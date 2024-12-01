package is2.g57.hopetrade.entity;

import java.sql.Date;
import java.util.Objects;

import jakarta.persistence.*;

@Entity
@Table(name="tarjeta")
public class Tarjeta {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tarjeta_id")
    private Long tarjeta_id;

	@Column(name="numero", unique = true, nullable = false, length=20)
	private String numero;

	@Column(name="nombre_titular", nullable = false, length=100)
	private String nombre_titular;

	@Column(name="fecha_vencimiento", nullable = false)
	private Date fecha_vencimiento;

	@Column(name="dni_titular", nullable = false, length=10)
	private String dni_titular;

	@Column(name="codigo", nullable = false, length=4)
	private String codigo;

	@Column(name="saldo_disponible", nullable = false)
	private Double saldo_disponible;

	@Column(name="activa", nullable = false)
	private Boolean activa;


	public Tarjeta() {
	}

	public Tarjeta(Long tarjeta_id, String numero, String nombre_titular, Date fecha_vencimiento, String dni_titular, String codigo, Double saldo_disponible, Boolean activa) {
		this.tarjeta_id = tarjeta_id;
		this.numero = numero;
		this.nombre_titular = nombre_titular;
		this.fecha_vencimiento = fecha_vencimiento;
		this.dni_titular = dni_titular;
		this.codigo = codigo;
		this.saldo_disponible = saldo_disponible;
		this.activa = activa;
	}

	public Tarjeta(String numero, String nombre_titular, Date fecha_vencimiento, String dni_titular, String codigo, Double saldo_disponible, Boolean activa) {
		this.numero = numero;
		this.nombre_titular = nombre_titular;
		this.fecha_vencimiento = fecha_vencimiento;
		this.dni_titular = dni_titular;
		this.codigo = codigo;
		this.saldo_disponible = saldo_disponible;
		this.activa = activa;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Tarjeta unaTarjeta = (Tarjeta) o;
		return Objects.equals(numero, unaTarjeta.numero) && Objects.equals(tarjeta_id, unaTarjeta.tarjeta_id);
	}


    public Long getId() {
        return tarjeta_id;
    }
    public void setId(Long tarjeta_id) {
        this.tarjeta_id = tarjeta_id;
    }

	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getNombre_titular() {
		return nombre_titular;
	}
	public void setNombre_titular(String nombre_titular) {
		this.nombre_titular = nombre_titular;
	}

	public Date getFecha_vencimiento() {
		return fecha_vencimiento;
	}
	public void setFecha_vencimiento(Date fecha_vencimiento) {
		this.fecha_vencimiento = fecha_vencimiento;
	}

	public String getDni_titular() {
		return dni_titular;
	}
	public void setDni_titular(String dni_titular) {
		this.dni_titular = dni_titular;
	}

	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public Double getSaldo_disponible() {
		return saldo_disponible;
	}
	public void setSaldo_disponible(Double saldo_disponible) {
		this.saldo_disponible = saldo_disponible;
	}

	public Boolean getActiva() {
		return activa;
	}
	public void setActiva(boolean activa) {
		this.activa = activa;
	}

}
