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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.service.UserService;



@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/{id}")
	public ResponseEntity<User> ObtenerUsuarioPorId(@PathVariable Long Id) {
		Optional<User> userOp = this.userService.findById(Id);
		if (userOp.isPresent()) {
			return new ResponseEntity<>(userOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{dni}")
	public ResponseEntity<User> ObtenerUsuarioPorDni(@PathVariable String dni) {
		Optional<User> userOp = this.userService.findByDni(dni);
		if (userOp.isPresent()) {
			return new ResponseEntity<>(userOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{user}")
	public ResponseEntity<?> GuardarUsuario(@RequestParam String dni, @RequestParam String nombre,
			@RequestParam String email, @RequestParam String pass, @RequestParam String apellido,
			@RequestParam LocalDate fecha_nacimiento) {
		LocalDate fecha = LocalDate.now();
		int edad = Period.between(fecha_nacimiento, fecha).getYears();
		Date fecha_Nacimiento_Sql = Date.valueOf(fecha_nacimiento);

		try {
			if (dni.length() > 8 || dni.length() < 6) {
				return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
			}
			int dni_parse = Integer.parseInt(dni);
			if (edad < 18) {
				return new ResponseEntity<>("Debes ser mayor de 18 años para registrarte", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
		}

		try {
			User user = new User(email, dni, pass, nombre, apellido, fecha_Nacimiento_Sql);
			this.userService.save(user);
			return new ResponseEntity<>("Usuario registrado", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("El dni o mail ya pertenece a una cuenta", HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/{useredit}")
	public ResponseEntity<?> ActualizarPerfilUsuario(@PathVariable Long id, @RequestParam String mail, @RequestParam String nombre,
			@RequestParam String apellido) {
		try {
			userService.update(id, mail, nombre, apellido);
			return new ResponseEntity<>("Cambios guardados",HttpStatus.OK);		
		}catch (Exception e) {
			return new ResponseEntity<>("El mail: " + mail + " ya se encuentra en uso",HttpStatus.BAD_REQUEST);
		} 
	}  
}
