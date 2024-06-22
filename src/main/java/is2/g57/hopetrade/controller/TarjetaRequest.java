package is2.g57.hopetrade.controller;

import java.sql.Date;

public class TarjetaRequest {
	private String numero;
	private String nombre_titular;
	private Date fecha_vencimiento;
	private String dni_titular;
	private String codigo;
	private Double monto;

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

	public Double getMonto() {
		return monto;
	}
	public void setMonto(Double monto) {
		this.monto = monto;
	}

}
