package is2.g57.hopetrade.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="donacion_en_filial", uniqueConstraints=@UniqueConstraint(name="IX_DONACION_EN_FILIAL_01", columnNames={"fecha_hora", "id_ayudante"}))
public class DonacionEnFilial {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_donacion_en_filial")
    private Long id_donacion_en_filial;

	@Column(name="fecha_hora", nullable = false)
	private LocalDateTime fecha_hora;

	@Column(name = "dni", nullable = false, length = 15)
	private String dni;

    @Column(name="nombre_apellido", nullable = false, length = 200)
	private String nombre_apellido;

    @Column(name="id_filial", nullable = false)
    private Long id_filial;

    @Column(name="id_ayudante", nullable = false)
    private Long id_ayudante;

    @Column(name="id_categoria", nullable = false)
    private Long id_categoria;

	@Column(name="descripcion", nullable = false, length=240)
	private String descripcion;

	@Column(name="cantidad", nullable = false)
	private Integer cantidad;

    @Column(name = "es_dinero", nullable = false)
	private boolean es_dinero;


    public DonacionEnFilial() {
    }

    public DonacionEnFilial(LocalDateTime fecha_hora, String dni, String nombre_apellido, Long id_filial,
            Long id_ayudante, Long id_categoria, String descripcion, Integer cantidad, boolean es_dinero) {
        this.fecha_hora = fecha_hora;
        this.dni = dni;
        this.nombre_apellido = nombre_apellido;
        this.id_filial = id_filial;
        this.id_ayudante = id_ayudante;
        this.id_categoria = id_categoria;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.es_dinero = es_dinero;
    }

    public DonacionEnFilial(Long id_donacion_en_filial, LocalDateTime fecha_hora, String dni, String nombre_apellido,
            Long id_filial, Long id_ayudante, Long id_categoria, String descripcion, Integer cantidad,
            boolean es_dinero) {
        this.id_donacion_en_filial = id_donacion_en_filial;
        this.fecha_hora = fecha_hora;
        this.dni = dni;
        this.nombre_apellido = nombre_apellido;
        this.id_filial = id_filial;
        this.id_ayudante = id_ayudante;
        this.id_categoria = id_categoria;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.es_dinero = es_dinero;
    }

    public Long getId() {
        return id_donacion_en_filial;
    }

    public void setId(Long id_donacion_en_filial) {
        this.id_donacion_en_filial = id_donacion_en_filial;
    }

    public LocalDateTime getFecha_hora() {
        return fecha_hora;
    }

    public void setFecha_hora(LocalDateTime fecha_hora) {
        this.fecha_hora = fecha_hora;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre_apellido() {
        return nombre_apellido;
    }

    public void setNombre_apellido(String nombre_apellido) {
        this.nombre_apellido = nombre_apellido;
    }

    public Long getId_filial() {
        return id_filial;
    }

    public void setId_filial(Long id_filial) {
        this.id_filial = id_filial;
    }

    public Long getId_ayudante() {
        return id_ayudante;
    }

    public void setId_ayudante(Long id_ayudante) {
        this.id_ayudante = id_ayudante;
    }

    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public boolean isEs_dinero() {
        return es_dinero;
    }

    public void setEs_dinero(boolean es_dinero) {
        this.es_dinero = es_dinero;
    }

}
