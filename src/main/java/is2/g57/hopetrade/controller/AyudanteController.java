package is2.g57.hopetrade.controller;

import java.util.List;
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

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.repository.AyudanteRepository;

@RestController
@RequestMapping("/ayudante")
public class AyudanteController {


	@Autowired
	private AyudanteRepository ayudanteRepository;
	
	@GetMapping("/listar-ayudantes")
	public @ResponseBody Iterable<Ayudante> getAllAyudantes() {
		return ayudanteRepository.findAll();
	}
	
	//No se si es necesario implementarlo pero no creo que este por demas, por si nos piden algo que necesite esta logica, ya lo tenemos.
	@GetMapping("/listar-ayudantes-activos")
	public @ResponseBody Iterable<Ayudante> getAllAyudantesActivos() {
		return ayudanteRepository.findByActivoTrue();
	}
	
	//No se si es necesario implementarlo pero no creo que este por demas, por si nos piden algo que necesite esta logica, ya lo tenemos.
	@GetMapping("/listar-ayudantes-noactivos")
	public @ResponseBody Iterable<Ayudante> getAllAyudantesNoActivos() {
		return ayudanteRepository.findByActivoFalse();
	}
	
	@GetMapping("/{id_ayudante}")
	public ResponseEntity<Ayudante> ObtenerAyudantePorId(@PathVariable(value = "id_ayudante") Long Id) {
		Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findById(Id);
		if (ayudanteOp.isPresent()) {
			return new ResponseEntity<>(ayudanteOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/mail")
	public ResponseEntity<?> ObtenerAyudantePorMail(@RequestBody AyudanteRequest ayudanteRequest) {
		String mail = ayudanteRequest.getEmail();
		Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByEmail(mail);
		if (ayudanteOp.isPresent()) {
			return new ResponseEntity<>(ayudanteOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro Ayudante", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/dni")
	public ResponseEntity<?> ObtenerAyudantePorDni(@RequestBody AyudanteRequest ayudanteRequest) {
		String dni = ayudanteRequest.getDni();
		Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByDni(dni);
		if (ayudanteOp.isPresent()) {
			return new ResponseEntity<>(ayudanteOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro Ayudante", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/actualizar")
	public ResponseEntity<?> ActualizarAyudante(@RequestBody AyudanteRequest ayudanteRequest) {
		String dni = ayudanteRequest.getDni();
		Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByDni(dni);

		if (ayudanteOp.isPresent()) {
			Ayudante ayudante = ayudanteOp.get();
			// Actualizar email, nombre y apellido si los nuevos valores no son nulos
			if (ayudanteRequest.getEmail() != null) {
				ayudante.setEmail(ayudanteRequest.getEmail());
			}
			if (ayudanteRequest.getNombre() != null) {
				ayudante.setNombre(ayudanteRequest.getNombre());
			}
			if (ayudanteRequest.getApellido() != null) {
				ayudante.setApellido(ayudanteRequest.getApellido());
			}
			// Guardar los cambios actualizados en la base de datos
			this.ayudanteRepository.save(ayudante);
			return new ResponseEntity<>("Ayudante actualizado correctamente", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontró ayudante con el DNI proporcionado", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/cambiar-pass")
	public ResponseEntity<?> CambiarContrasenia(@RequestBody CambiarContraseniaRequest cambiarContraseniaRequest) {
		String dni = cambiarContraseniaRequest.getDni();
		Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByDni(dni);

		if (ayudanteOp.isPresent()) {
			Ayudante ayudante = ayudanteOp.get();
			// Verificar que la antigua contraseña proporcionada sea correcta
			if (!ayudante.getPass().equals(cambiarContraseniaRequest.getAntiguaContrasenia())) {
				return new ResponseEntity<>("La contraseña antigua es incorrecta", HttpStatus.UNAUTHORIZED);
			}
			// Actualizar la contraseña solo si la antigua contraseña es correcta
			ayudante.setPass(cambiarContraseniaRequest.getNuevaContrasenia());
			this.ayudanteRepository.save(ayudante);
			return new ResponseEntity<>("Contraseña actualizada correctamente", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontró ayudante con el DNI proporcionado", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/guardar")
	public ResponseEntity<?> GuardarAyudante(@RequestBody AyudanteRequest ayudanteRequest) {

		try {
			if (ayudanteRequest.getDni().length() > 8 || ayudanteRequest.getDni().length() < 6) {
				return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
			}
			int dni_parse = Integer.parseInt(ayudanteRequest.getDni());
		} catch (Exception e) {
			return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
		}

		try {
			Ayudante ayudante = new Ayudante(ayudanteRequest.getEmail(), ayudanteRequest.getDni(),
					ayudanteRequest.getPass(), ayudanteRequest.getNombre(), ayudanteRequest.getApellido());
			this.ayudanteRepository.save(ayudante);
			return new ResponseEntity<>("Ayudante registrado", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("El mail ya pertenece a una cuenta", HttpStatus.BAD_REQUEST);
		}

	}
	
	
	@PostMapping("/dar-baja-ayudante")
	public ResponseEntity<?> DarDeBajaAyudante(@RequestBody AyudanteRequest ayudanteRequest) {
	    String mail = ayudanteRequest.getEmail();
	    Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByEmail(mail);

	    if (ayudanteOp.isPresent()) {
	        Ayudante ayudante = ayudanteOp.get();
	        if (ayudante.isActivo()) {
	            ayudante.setActivo(false);
	            this.ayudanteRepository.save(ayudante);
	            return new ResponseEntity<>("El ayudante con dni: " + ayudante.getDni() + " y mail: " + ayudante.getEmail() + " ha sido dado de baja exitosamente.", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("El ayudante con dni: " + ayudante.getDni() + " y mail: " + ayudante.getEmail() + " ya está inactivo.", HttpStatus.BAD_REQUEST);
	        }
	    } else {
	        return new ResponseEntity<>("No se encontró un ayudante con el email proporcionado.", HttpStatus.NOT_FOUND);
	    }
	}
	
	//Se me ocurrio hacerlo como habiamos comentado que los representantes tengan su pass y que sea admin, ya que van a realizar tareas de administracion, 
    //por lo tanto segun que contraseña ingresen, se dara la ingreso a la cuenta.
	@PostMapping("/login")
    public ResponseEntity<?> loginAyudante(@RequestBody AyudanteLoginRequest ayudanteLoginRequest) {
        String email = ayudanteLoginRequest.getEmail();
        String password = ayudanteLoginRequest.getPassword();

        Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByEmail(email);

        if (!ayudanteOp.isPresent()) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Email no registrado", null, null, null), HttpStatus.UNAUTHORIZED);
        }

        Ayudante ayudante = ayudanteOp.get();

        if (!ayudante.getPass().equals(password)) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Email y contraseña no coinciden", null, null, null), HttpStatus.UNAUTHORIZED);
        }

        if (!ayudante.isActivo()) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Cuenta suspendida", null, null, null), HttpStatus.UNAUTHORIZED);
        }
        
        if(ayudante.getPass().equals("admin")) {
        	LoginResponse response = new LoginResponse(ayudante.getDni(), ayudante.getId(), ayudante.isActivo(), "Inicio de sesion como Ayudante.", ayudante.getNombre(), ayudante.getApellido(), 2);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else {
        	LoginResponse response = new LoginResponse(ayudante.getDni(), ayudante.getId(), ayudante.isActivo(), "Inicio de sesion como Representante.", ayudante.getNombre(), ayudante.getApellido(), 2);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

}
