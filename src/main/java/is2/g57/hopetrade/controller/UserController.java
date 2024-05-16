package is2.g57.hopetrade.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
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

	@PostMapping("/guardarUsuario")
	public ResponseEntity<?> GuardarUsuario(@RequestBody UserRequest userRequest) {

		if (userRequest.getDni() == null || userRequest.getEmail() == null || userRequest.getNombre() == null
				|| userRequest.getApellido() == null || userRequest.getFecha_nacimiento() == null
				|| userRequest.getPass() == null) {
			return new ResponseEntity<>("Debe llenar todos los campos", HttpStatus.BAD_REQUEST);
		}

		LocalDate fecha = LocalDate.now();
		int edad = Period.between(userRequest.getFecha_nacimiento(), fecha).getYears();
		Date fecha_Nacimiento_Sql = Date.valueOf(userRequest.getFecha_nacimiento());

		try {
			if (userRequest.getDni().length() > 8 || userRequest.getDni().length() < 6) {
				return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
			}
			int dni_parse = Integer.parseInt(userRequest.getDni());
			if (edad < 18) {
				return new ResponseEntity<>("Debes ser mayor de 18 años para registrarte", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
		}

		try {
			User user = new User(userRequest.getEmail(), userRequest.getDni(), userRequest.getPass(),
					userRequest.getNombre(), userRequest.getApellido(), fecha_Nacimiento_Sql);
			this.userRepository.save(user);
			return new ResponseEntity<>("Usuario registrado", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("El dni o mail ya pertenece a una cuenta", HttpStatus.BAD_REQUEST);
		}
	}

//	@PostMapping("/guardarUsuario")
//    public ResponseEntity<?> GuardarUsuario(@RequestParam String dni, @RequestParam String nombre,
//                                            @RequestParam String email, @RequestParam String pass, 
//                                            @RequestParam String apellido, @RequestParam LocalDate fecha_nacimiento) {
//        LocalDate fecha = LocalDate.now();
//        int edad = Period.between(fecha_nacimiento, fecha).getYears();
//        Date fecha_Nacimiento_Sql = Date.valueOf(fecha_nacimiento);
//
//        try {
//            if (dni.length() > 8 || dni.length() < 6) {
//                return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
//            }
//            int dni_parse = Integer.parseInt(dni);
//            if (edad < 18) {
//                return new ResponseEntity<>("Debes ser mayor de 18 años para registrarte", HttpStatus.BAD_REQUEST);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
//        }
//
//        try {
//            User user = new User(email, dni, pass, nombre, apellido, fecha_Nacimiento_Sql);
//            this.userRepository.save(user);
//            return new ResponseEntity<>("Usuario registrado", HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>("El dni o mail ya pertenece a una cuenta", HttpStatus.BAD_REQUEST);
//        }
//    }

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<User> getAllUsers() {
		// This returns a JSON or XML with the users
		return userRepository.findAll();
	}

	@PostMapping("/{useredit}")
	public ResponseEntity<?> ActualizarPerfilUsuario(@RequestBody UserRequest userRequest) {

		try {

			this.update(userRequest.getId(), userRequest.getEmail(), userRequest.getNombre(),
					userRequest.getApellido());
			return new ResponseEntity<>("Cambios guardados", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("El mail: " + userRequest.getEmail() + " ya se encuentra en uso",
					HttpStatus.BAD_REQUEST);
		}
	}

	public void update(Long id, String email, String nombre, String apellido) {
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
