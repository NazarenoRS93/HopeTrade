package is2.g57.hopetrade.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import is2.g57.hopetrade.entity.Tarjeta;
import is2.g57.hopetrade.entity.DonacionTarjeta;
import is2.g57.hopetrade.repository.TarjetaRepository;
import is2.g57.hopetrade.repository.DonacionTarjetaRepository;


@RestController
@RequestMapping(path = "/donacion")
public class TarjetaController {
	@Autowired
	private TarjetaRepository tarjetaRepository;
	@Autowired
	private DonacionTarjetaRepository donacionRepository;

	@PostMapping("/pago-tarjeta")
	public ResponseEntity<?> RegistrarPagoTarjeta(@RequestBody TarjetaRequest paramTarjetaRequest) {
		Double nMinMonto = 10.0;	// esto lo saqué de la página: caritaslaplata.org
		//Double nMaxMonto = 100000.0;
		// Se valida que el monto a donar esté dentro del rango establecido
		if (nMinMonto <= paramTarjetaRequest.getMonto()) {
			Optional<Tarjeta> tarjetaOpt = this.tarjetaRepository.findTarjetaByNumero(paramTarjetaRequest.getNumero());
			// Se valida si el número de tarjeta es válido
			if (tarjetaOpt.isPresent()) {
				Tarjeta unaTarjeta = tarjetaOpt.get();
				// Se valida si la tarjeta está activa
				if (unaTarjeta.getActiva() == true) {
					try {
						// Se toma la fecha actual y se la convierte a 1° de mes
						LocalDate fecha = LocalDate.now();
						fecha = LocalDate.of(fecha.getYear(), fecha.getMonthValue(), 1);
						// Se valida si la fecha de vencimiento de la tarjeta es igual a la fecha ingresada y, además, si no está vencida (debe superar a la fecha actual)
						if (unaTarjeta.getFecha_vencimiento().compareTo(paramTarjetaRequest.getFecha_vencimiento()) == 0 && unaTarjeta.getFecha_vencimiento().compareTo(Date.valueOf(fecha)) >= 0) {
							// Se valida que el nombre del titular y el dni ingresado coincidan con los datos de la tarjeta
							if (unaTarjeta.getNombre_titular().equals(paramTarjetaRequest.getNombre_titular()) && unaTarjeta.getDni_titular().equals(paramTarjetaRequest.getDni_titular())) {
								// Se valida que el código de seguridad sea el que corresponda
								if (unaTarjeta.getCodigo().equals(paramTarjetaRequest.getCodigo())) {
									// Se valida que la tarjeta tenga saldo disponible
									if (unaTarjeta.getSaldo_disponible() >= paramTarjetaRequest.getMonto()) {
										// Se le resta saldo a la tarjeta (esto es parte de la simulación, ya que esto debería resolverlo la API de la entidad de pago)
										unaTarjeta.setSaldo_disponible(unaTarjeta.getSaldo_disponible() - paramTarjetaRequest.getMonto());
										this.tarjetaRepository.save(unaTarjeta);
										// Se registra la operación
										DonacionTarjeta unaDonacion = new DonacionTarjeta(LocalDateTime.now(), paramTarjetaRequest.getId_usuario()
												, unaTarjeta.getNumero(), paramTarjetaRequest.getMonto());
										this.donacionRepository.save(unaDonacion);
										// Se devuelve mensaje de éxito
										return new ResponseEntity<>("¡Muchas gracias por colaborar con Cáritas! ¡Recibimos tu pago correctamente!", HttpStatus.OK);
										// ¿¿enviar un emilio??
									} else {
										return new ResponseEntity<>("La tarjeta ingresada no dispone de saldo suficiente para completar la operación.", HttpStatus.BAD_REQUEST);
									}
								} else {
									return new ResponseEntity<>("El código de seguridad ingresado no es válido.", HttpStatus.BAD_REQUEST);
								}
							} else {
								return new ResponseEntity<>("Los datos del titular ingresados no se corresponden con los de la tarjeta.", HttpStatus.BAD_REQUEST);
							}
						} else {
							return new ResponseEntity<>("La tarjeta ingresada se encuentra vencida o la fecha de vencimiento ingresada no es correcta.", HttpStatus.BAD_REQUEST);
						}
					} catch (Exception e) {
						return new ResponseEntity<>("¡Lo sentimos! El pago no pudo ser procesado dado que ocurrió el siguiente error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
					}
				} else {
					return new ResponseEntity<>("La tarjeta ingresada no se encuentra habilitada. Por favor, comuníquese con la entidad emisora de la misma.", HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>("El número ingresado no corresponde a una tarjeta de crédito válida.", HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<>("Por favor, revise el monto ingresado. El mismo no debe ser inferior a $" + Double.toString(nMinMonto).replace(".0", "") + ".", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/tarjeta/all")
    public ResponseEntity<?> obtenerTodasLasDonacionesTarjeta() {
        List<DonacionTarjeta> donaciones = this.donacionRepository.findAll();
        return new ResponseEntity<>(donaciones, HttpStatus.OK);
    }

}
