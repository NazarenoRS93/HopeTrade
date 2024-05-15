package is2.g57.hopetrade.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.service.AyudanteService;



@RequestMapping("/ayudante")
public class AyudanteController {

	@Autowired
	private AyudanteService ayudanteService;

	@GetMapping("/{id}")
	public ResponseEntity<Ayudante> ObtenerAyudantePorId(@PathVariable Long Id) {
		Optional<Ayudante> ayudanteOp = this.ayudanteService.findById(Id);
		if (ayudanteOp.isPresent()) {
			return new ResponseEntity<>(ayudanteOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{mail}")
	public ResponseEntity<Ayudante> ObtenerAyudantePorMail(@PathVariable String mail) {
		Optional<Ayudante> ayudanteOp = this.ayudanteService.findByMail(mail);
		if (ayudanteOp.isPresent()) {
			return new ResponseEntity<>(ayudanteOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{ayudante}")
	public ResponseEntity<?> GuardarAyudante(String email, String dni, String pass, String nombre, String apellido) {

		try {
			if (dni.length() > 8 || dni.length() < 6) {
				return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
			}
			int dni_parse = Integer.parseInt(dni);
		} catch (Exception e) {
			return new ResponseEntity<>("Ingrese un DNI valido", HttpStatus.BAD_REQUEST);
		}

		try {
			Ayudante ayudante = new Ayudante(email, dni, pass, nombre, apellido);
			this.ayudanteService.save(ayudante);
			return new ResponseEntity<>("Ayudante registrado", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("El mail ya pertenece a una cuenta", HttpStatus.BAD_REQUEST);
		}

	}

}
