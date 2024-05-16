package is2.g57.hopetrade.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.repository.AyudanteRepository;

@RestController
@RequestMapping("/ayudante")
public class AyudanteController {

	 @Autowired
	    private AyudanteRepository ayudanteRepository;

	    @GetMapping("/id")
	    public ResponseEntity<?> ObtenerAyudantePorId(@RequestBody AyudanteRequest ayudanteRequest) {
	    	Long Id = ayudanteRequest.getId();
	        Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findById(Id);
	        if (ayudanteOp.isPresent()) {
	            return new ResponseEntity<>(ayudanteOp.get(), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("No se encontro ayudante",HttpStatus.NOT_FOUND);
	        }
	    }

	    @GetMapping("/mail")
	    public ResponseEntity<?> ObtenerAyudantePorMail(@RequestBody AyudanteRequest ayudanteRequest) {
	    	String mail = ayudanteRequest.getEmail();
	        Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByEmail(mail);
	        if (ayudanteOp.isPresent()) {
	            return new ResponseEntity<>(ayudanteOp.get(), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("No se encontro Ayudante",HttpStatus.NOT_FOUND);
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
	            Ayudante ayudante = new Ayudante(ayudanteRequest.getEmail(), ayudanteRequest.getDni(), ayudanteRequest.getPass(), ayudanteRequest.getNombre(), ayudanteRequest.getApellido());
	            this.ayudanteRepository.save(ayudante);
	            return new ResponseEntity<>("Ayudante registrado", HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>("El mail ya pertenece a una cuenta", HttpStatus.BAD_REQUEST);
	        }

	    }

//	@PostMapping("/{ayudante}")
//	public ResponseEntity<?> GuardarAyudante(String email, String dni, String pass, String nombre, String apellido) {
//
//		try {
//			if (dni.length() > 8 || dni.length() < 6) {
//				return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
//			}
//			int dni_parse = Integer.parseInt(dni);
//		} catch (Exception e) {
//			return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
//		}
//
//		try {
//			Ayudante ayudante = new Ayudante(email, dni, pass, nombre, apellido);
//			this.ayudanteRepository.save(ayudante);
//			return new ResponseEntity<>("Ayudante registrado", HttpStatus.CREATED);
//		} catch (Exception e) {
//			return new ResponseEntity<>("El mail ya pertenece a una cuenta", HttpStatus.BAD_REQUEST);
//		}
//
//	}

}
