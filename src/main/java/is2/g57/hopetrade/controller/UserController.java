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
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.UserRepository;

@RestController
@RequestMapping(path = "/user")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	public static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@GetMapping("/{id}")
	public ResponseEntity<?> ObtenerUsuarioPorId(@PathVariable Long id) {
		Optional<User> userOp = this.userRepository.findById(id);
		if (userOp.isPresent()) {
			return new ResponseEntity<>(userOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro usuario", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/buscar-por-dni")
	public ResponseEntity<?> ObtenerUsuarioPorDni(@RequestBody UserRequest userRequest) {
		String dni = userRequest.getDni();
		Optional<User> userOp = this.userRepository.findUserByDni(dni);
		if (userOp.isPresent()) {
			return new ResponseEntity<>(userOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro usuario", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/guardar")
	public ResponseEntity<?> GuardarUsuario(@RequestBody UserRequest request) {
		LocalDate fechaNacimiento = null;
		try {
			LocalDate fecha = LocalDate.now();
			fechaNacimiento = LocalDate.parse(request.getFecha_nacimiento(), dtf);
			int edad = Period.between(fechaNacimiento, fecha).getYears();

			if (request.getDni().length() > 8 || request.getDni().length() < 6) {
				return new ResponseEntity<>("Ingrese un DNI válido.", HttpStatus.BAD_REQUEST);
			}
			int dni_parse = Integer.parseInt(request.getDni());
			if (edad < 18) {
				return new ResponseEntity<>("Debes ser mayor de 18 años para registrarte.", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Datos inválidos.", HttpStatus.BAD_REQUEST);
		}
		try {
			User user = new User(request.getEmail(), request.getDni(), request.getPass(), request.getNombre(),
					request.getApellido(), Date.valueOf(fechaNacimiento));
			this.userRepository.save(user);
			return new ResponseEntity<>("¡Usuario registrado exitosamente!", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("DNI o mail ya están registrados a otra cuenta.", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<User> getAllUsers() {
		// This returns a JSON or XML with the users
		return userRepository.findAll();
	}

	@PostMapping("/updateProfile")
	public ResponseEntity<?> ActualizarPerfilUsuario(@RequestBody UserRequest request) {
		try {
			this.update(request.getId(), request.getEmail(), request.getNombre(), request.getApellido());
			return new ResponseEntity<>("Cambios guardados", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("El mail: " + request.getEmail() + " ya se encuentra en uso",
					HttpStatus.BAD_REQUEST);
		}
	}

	public void update(Long id, String email, String nombre, String apellido) {
		Optional<User> userOp = userRepository.findById(id);
		if (userOp.isPresent()) {
			User user = userOp.get();
			if (email != "") {
				if (!email.equals(user.getEmail())) {
					if (userRepository.findUserByEmail(email).isPresent()) {
						throw new IllegalArgumentException();
					} else {
						user.setEmail(email);
					}
				}
			}

			if (apellido != "") {
				user.setApellido(apellido);
			}
			if (nombre != "") {
				user.setNombre(nombre);
			}
			userRepository.save(user);
		}
	}

	@PostMapping("/updatepassword")
	public ResponseEntity<?> updatePass(@RequestBody CambiarContraseniaRequest cambiarContraseniaRequest) {
	    Optional<User> userOp = userRepository.findById(cambiarContraseniaRequest.getId());
	    
	    if (!userOp.isPresent()) {
	        return new ResponseEntity<>("Usuario no encontrado", HttpStatus.BAD_REQUEST);
	    }

	    User user = userOp.get();
	    String currentPassword = user.getPass();
	    String oldPassword = cambiarContraseniaRequest.getAntiguaContrasenia();
	    String newPassword = cambiarContraseniaRequest.getNuevaContrasenia();

	    ResponseEntity<?> validationResponse = validatePasswords(currentPassword, oldPassword, newPassword);
	    if (validationResponse != null) {
	        return validationResponse;
	    }

	    user.setPass(newPassword);
	    userRepository.save(user);
	    return new ResponseEntity<>("Cambios guardados", HttpStatus.OK);
	}

	private ResponseEntity<?> validatePasswords(String currentPassword, String oldPassword, String newPassword) {
	    if (!currentPassword.equals(oldPassword)) {
	        return new ResponseEntity<>("Debes ingresar tu contraseña actual.", HttpStatus.BAD_REQUEST);
	    }
	    if (newPassword == "" ) {
	        return new ResponseEntity<>("Debes ingresar una nueva contraseña.", HttpStatus.BAD_REQUEST);
	    }
	    if (currentPassword.equals(newPassword)) {
	        return new ResponseEntity<>("Debes ingresar una contraseña diferente a la actual.", HttpStatus.BAD_REQUEST);
	    }
	    return null;
	}
	

}
