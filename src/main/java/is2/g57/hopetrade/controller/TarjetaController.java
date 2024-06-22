package is2.g57.hopetrade.controller;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import is2.g57.hopetrade.entity.Tarjeta;
import is2.g57.hopetrade.repository.TarjetaRepository;

@RestController
@RequestMapping(path = "/donacion")
public class TarjetaController {
	@Autowired
	private TarjetaRepository tarjetaRepository;
	public static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@PostMapping("/pago-tarjeta")
	public ResponseEntity<?> RegistrarPagoTarjeta(@RequestBody TarjetaRequest paramTarjetaRequest) {
		//String numeroTarjeta = tarjetaRequest.getNumero();
		Optional<Tarjeta> tarjetaOpt = this.tarjetaRepository.findTarjetaByNumero(paramTarjetaRequest.getNumero());

		if (tarjetaOpt.isPresent()) {
			Tarjeta unaTarjeta = tarjetaOpt.get();
			//return new ResponseEntity<>(userOp.get(), HttpStatus.OK);
			if (unaTarjeta.getActiva() == true) {
				// Se toma la fecha actual y se la convierte a 1° de mes ()
				LocalDate fecha = LocalDate.now();
				fecha = LocalDate.of(fecha.getYear(), fecha.getMonthValue(), 1);
				// Se valida si la fecha de vencimiento de la tarjeta es igual a la fecha ingresada y, además, si no está vencida (debe superar a la fecha actual)
				if (unaTarjeta.getFecha_vencimiento().compareTo(paramTarjetaRequest.getFecha_vencimiento()) == 0 && unaTarjeta.getFecha_vencimiento().compareTo(Date.valueOf(fecha)) >= 0) {
					if (unaTarjeta.getNombre_titular().equals(paramTarjetaRequest.getNombre_titular()) && unaTarjeta.getDni_titular().equals(paramTarjetaRequest.getDni_titular())) {
						if (unaTarjeta.getCodigo().equals(paramTarjetaRequest.getCodigo())) {
							if (unaTarjeta.getSaldo_disponible() >= paramTarjetaRequest.getMonto()) {
								// Se le resta saldo a la tarjeta ()
								unaTarjeta.setSaldo_disponible(unaTarjeta.getSaldo_disponible() - paramTarjetaRequest.getMonto());
								this.tarjetaRepository.save(unaTarjeta);
								// Se registra la operación

								// Se devuelve mensaje de éxito
								return new ResponseEntity<>("¡Todo OK! ¡Muchas gracias!", HttpStatus.OK);
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
			} else {
				return new ResponseEntity<>("La tarjeta ingresada no se encuentra habilitada. Por favor, comuníquese con la entidad emisora de la misma.", HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity<>("El número ingresado no corresponde a una tarjeta de crédito válida.", HttpStatus.NOT_FOUND);
		}

//		LocalDate fechaNacimiento = null;
//		try {
//			LocalDate fecha = LocalDate.now();
//			fechaNacimiento = LocalDate.parse(request.getFecha_nacimiento(), dtf);
//			int edad = Period.between(fechaNacimiento, fecha).getYears();

//			if (request.getDni().length() > 8 || request.getDni().length() < 6) {
//				return new ResponseEntity<>("Ingrese un DNI válido.", HttpStatus.BAD_REQUEST);
//			}
//			int dni_parse = Integer.parseInt(request.getDni());
//			if (edad < 18) {
//				return new ResponseEntity<>("Debes ser mayor de 18 años para registrarte.", HttpStatus.BAD_REQUEST);
//			}
//		} catch (Exception e) {
//			return new ResponseEntity<>("Datos inválidos.", HttpStatus.BAD_REQUEST);
//		}
//		try {
//			User user = new User(request.getEmail(), request.getDni(), request.getPass(), request.getNombre(),
//					request.getApellido(), Date.valueOf(fechaNacimiento));
//			this.userRepository.save(user);
//			return new ResponseEntity<>("¡Usuario registrado exitosamente!", HttpStatus.CREATED);
//		} catch (Exception e) {
//			return new ResponseEntity<>("DNI o mail ya están registrados a otra cuenta.", HttpStatus.BAD_REQUEST);
//		}
	}

//	@GetMapping(path = "/all")
//	public @ResponseBody Iterable<User> getAllUsers() {
		// This returns a JSON or XML with the users
//		return userRepository.findAll();
//	}

//	@PostMapping("/updateProfile")
//	public ResponseEntity<?> ActualizarPerfilUsuario(@RequestBody UserRequest request) {
//		try {
//			this.update(request.getId(), request.getEmail(), request.getNombre(), request.getApellido());
//			return new ResponseEntity<>("Cambios guardados", HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>("El mail: " + request.getEmail() + " ya se encuentra en uso",
//					HttpStatus.BAD_REQUEST);
//		}
//	}


}
