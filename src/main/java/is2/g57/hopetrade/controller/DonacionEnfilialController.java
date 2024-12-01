package is2.g57.hopetrade.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import is2.g57.hopetrade.entity.DonacionEnFilial;
import is2.g57.hopetrade.repository.DonacionEnFilialRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/donacion-presencial")
public class DonacionEnfilialController {
	@Autowired
	private DonacionEnFilialRepository donacionEnFilialRepository;

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarDonacionPresencial(@RequestBody DonacionEnFilialRequest donacion) {
		try {
			DonacionEnFilial donacionOp = new DonacionEnFilial(donacion.getDni_donante(),
					donacion.getNombre_completo_donante(), donacion.getId_filial(), donacion.getId_ayudante(),
					donacion.getId_categoria(), donacion.getDescripcion_donacion(), donacion.getCantidad(),
					donacion.getEs_dinero());
			this.donacionEnFilialRepository.save(donacionOp);
			return new ResponseEntity<>("Donacion registrada con exito", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrio un error", HttpStatus.BAD_GATEWAY);
		}
	}

	@GetMapping("/{id-donacion}")
	public ResponseEntity<?> obtenerDonacionPorId(@PathVariable(value = "id-donacion") Long id) {
		Optional<DonacionEnFilial> donacionOp = this.donacionEnFilialRepository.findById(id);
		if (donacionOp.isPresent()) {
			return new ResponseEntity<>(donacionOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la donacion", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/all")
	public ResponseEntity<?> obtenerTodasLasDonacionesEnFilial() {
		List<DonacionEnFilial> donaciones = this.donacionEnFilialRepository.findAll();
		return new ResponseEntity<>(donaciones, HttpStatus.OK);
	}

}
