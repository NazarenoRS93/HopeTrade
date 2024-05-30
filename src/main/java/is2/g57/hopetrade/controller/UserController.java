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
	public ResponseEntity<?> ObtenerUsuarioPorId(@RequestBody UserRequest userRequest) {
		Long Id = userRequest.getId();
		Optional<User> userOp = this.userRepository.findById(Id);
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
			// Revisa que sea un dni valido
			if (request.getDni().length() > 8 || request.getDni().length() < 6) {
				return new ResponseEntity<>("Ingrese un DNI válido.", HttpStatus.BAD_REQUEST);
			}
			int dni_parse = Integer.parseInt(request.getDni());

			// Revisa que sea mayor de edad
			LocalDate fecha = LocalDate.now();
			fechaNacimiento = LocalDate.parse(request.getFecha_nacimiento(), dtf);
			int edad = Period.between(fechaNacimiento, fecha).getYears();
			if (edad < 18) {
				return new ResponseEntity<>("Solo los usuarios mayores de edad pueden registrarse en el sitio web",
						HttpStatus.BAD_REQUEST);
			}

			// Revisa que el DNI no este en uso
			Optional<User> usuarioOp = userRepository.findUserByDni(request.getDni());
			if (usuarioOp.isPresent()) {
				return new ResponseEntity<>("El DNI ingresado pertenece a un usuario ya registrado en el sistema",
						HttpStatus.BAD_REQUEST);
			}

			// Revisa que el Mail no este en uso
			usuarioOp = userRepository.findUserByEmail(request.getEmail());
			if (usuarioOp.isPresent()) {
				return new ResponseEntity<>("El correo electrónico ya está vinculado a otra cuenta",
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			return new ResponseEntity<>("Datos inválidos.", HttpStatus.BAD_REQUEST);
		}
		try {
			User user = new User(request.getEmail(), request.getDni(), request.getPass(), request.getNombre(),
					request.getApellido(), Date.valueOf(fechaNacimiento));
			this.userRepository.save(user);
			return new ResponseEntity<>("¡Usuario creado con éxito!", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("DNI o mail ya están registrados a otra cuenta.", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<User> getAllUsers() {
		// This returns a JSON or XML with the users
		return userRepository.findAll();
	}

	@PostMapping("/{useredit}")
	public ResponseEntity<?> ActualizarPerfilUsuario(@RequestBody UserRequest request) {

		try {
			// Al menos un dato no es nulo
			if (request.getEmail() == null && (request.getApellido() == null && (request.getNombre() == null))) {
				return new ResponseEntity<>("Debes ingresar al menos un dato", HttpStatus.BAD_REQUEST);
			}
			this.update(request.getId(), request.getEmail(), request.getNombre(), request.getApellido());
			return new ResponseEntity<>("Cambios guardados", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("El mail: " + request.getEmail() + " ya se encuentra en uso",
					HttpStatus.BAD_REQUEST);
		}
	}

	private void update(Long id, String email, String nombre, String apellido) {
		Optional<User> userOp = userRepository.findById(id);
		if (userOp.isPresent()) {
			User user = userOp.get();
			if (email != null) {
				if (userRepository.findUserByEmail(email).isPresent()) {
					throw new IllegalArgumentException();
				} else {
					user.setEmail(email);
				}
			}

			if (apellido != null) {
				user.setApellido(apellido);
			}
			if (nombre != null) {
				user.setNombre(nombre);
			}
			userRepository.save(user);
		}

	}

	@PostMapping("/updatepassword")
	public ResponseEntity<?> updatePass(@RequestBody UserRequest userRequest) {
		Optional<User> userOp = userRepository.findById(userRequest.getId());
		if (userOp.isPresent()) {
			User user = userOp.get();
			if (user.getPass().equals(userRequest.getPass())) {
				return new ResponseEntity<>("Debes ingresar una contraseña diferente a la actual",
						HttpStatus.BAD_REQUEST);
			} else {
				user.setPass(userRequest.getPass());
				userRepository.save(user);
				return new ResponseEntity<>("Cambios guardados", HttpStatus.OK);
			}

		}
		return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);

	}

}
