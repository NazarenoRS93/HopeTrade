package is2.g57.hopetrade.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="donacion_tarjeta", uniqueConstraints=@UniqueConstraint(name="IX_DONACION_TARJETA_01", columnNames={"fecha_hora", "id_usuario"}))
public class DonacionTarjeta {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_donacion_tarjeta")
    private Long id_donacion_tarjeta;

	@Column(name="fecha_hora", nullable = false)
	private LocalDateTime fecha_hora;

	@Column(name="id_usuario", nullable = false)
    private Long id_usuario;

	@Column(name="numero_tarjeta", nullable = false, length=20)
	private String numero_tarjeta;

	@Column(name="monto", nullable = false)
	private Double monto;


	public DonacionTarjeta() {
	}

	public DonacionTarjeta(LocalDateTime fecha_hora, Long id_usuario, String numero_tarjeta, Double monto) {
		this.fecha_hora = fecha_hora;
		this.id_usuario = id_usuario;
		this.numero_tarjeta = numero_tarjeta;
		this.monto = monto;
	}

	public DonacionTarjeta(Long id_donacion_tarjeta, LocalDateTime fecha_hora, Long id_usuario, String numero_tarjeta,
			Double monto) {
		this.id_donacion_tarjeta = id_donacion_tarjeta;
		this.fecha_hora = fecha_hora;
		this.id_usuario = id_usuario;
		this.numero_tarjeta = numero_tarjeta;
		this.monto = monto;
	}


	public Long getId() {
		return id_donacion_tarjeta;
	}

	public void setId(Long id_donacion_tarjeta) {
		this.id_donacion_tarjeta = id_donacion_tarjeta;
	}

	public LocalDateTime getFecha_hora() {
		return fecha_hora;
	}

	public void setFecha_hora(LocalDateTime fecha_hora) {
		this.fecha_hora = fecha_hora;
	}

	public Long getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Long id_usuario) {
		this.id_usuario = id_usuario;
	}

	public String getNumero_tarjeta() {
		return numero_tarjeta;
	}

	public void setNumero_tarjeta(String numero_tarjeta) {
		this.numero_tarjeta = numero_tarjeta;
	}

	public Double getMonto() {
		return monto;
	}

	public void setMonto(Double monto) {
		this.monto = monto;
	}

}
