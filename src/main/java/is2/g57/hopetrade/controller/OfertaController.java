package is2.g57.hopetrade.controller;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.repository.IntercambioRepository;
import is2.g57.hopetrade.repository.OfertaRepository;
import is2.g57.hopetrade.services.ImageService;

@RestController
@RequestMapping("/oferta")
public class OfertaController {

	@Autowired
	private OfertaRepository ofertaRepository;

	@Autowired
	private ImageService imageService;
	
	@Autowired IntercambioRepository intercambioRepository;

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarOferta(@RequestBody OfertaRequest ofertaRequest) {

		try {

			LocalDateTime fecha = ofertaRequest.getFechaIntercambio();
			// Verificar que el día esté entre lunes y viernes
			DayOfWeek dia = fecha.getDayOfWeek();
			boolean esDiaLaborable = dia != DayOfWeek.SATURDAY && dia != DayOfWeek.SUNDAY;

			// Verificar que la hora esté entre las 08:00 y las 20:00
			int hora = fecha.getHour();
			boolean enHorarioLaboral = hora >= 8 && hora < 20;

			if (esDiaLaborable && enHorarioLaboral) {
				Oferta oferta = new Oferta(ofertaRequest.getTexto(), fecha, ofertaRequest.getImagenUrl(), ofertaRequest.getPublicacion(),ofertaRequest.getFilial(),ofertaRequest.getUser());
				ofertaRepository.save(oferta);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(
						"La fecha y hora del intercambio deben estar entre lunes y viernes de 08:00 a 20:00.",
						HttpStatus.BAD_REQUEST);

			}
		} catch (Exception e) {
			return new ResponseEntity<>("Error al procesar la solicitud", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/ObtenerPorId/{id}")
	public ResponseEntity<?> obtenerOfertaPorId(@PathVariable("id") Long ofertaId) {
		Optional<Oferta> ofertaOp = this.ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			return new ResponseEntity<>(ofertaOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/user/{userId}")
	public @ResponseBody Iterable<Oferta> buscarOfertaPorUserId(@PathVariable ("userId") Long userId) {
		Iterable<Oferta> oferta = ofertaRepository.findAllByUserId(userId);
		return oferta;
	}

	@GetMapping("/filial/{filialId}")
	public @ResponseBody Iterable<Oferta> buscarOfertaPorFilialId(@PathVariable("filialId") Long filialId) {
		Iterable<Oferta> oferta = ofertaRepository.findAllByFilialId(filialId);
		return oferta;
	}

	@GetMapping("/publicacion/{publicacionId}")
	public @ResponseBody Iterable<Oferta> buscarOfertaPorPublicacionId(@PathVariable("publicacionId") Long publicacionId) {
		Iterable<Oferta> oferta = ofertaRepository.findAllByPublicacionId(publicacionId);
		return oferta;
	}

	@PostMapping("/aceptar/{id}")
	public ResponseEntity<?> aceptarOferta(@PathVariable("id") Long ofertaId) {
		Optional<Oferta> ofertaOp = ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			Oferta oferta = ofertaOp.get();
			oferta.setEstado(true);
		    this.ofertaRepository.save(oferta);
		    Intercambio intercambio = new Intercambio(oferta.getPublicacion().getId(), oferta, "Pendiente");
		    this.intercambioRepository.save(intercambio);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/rechazar/{id}")
	public ResponseEntity<?> rechazarOferta(@PathVariable("id") Long ofertaId, OfertaRequest ofertaRequest) {
		Optional<Oferta> ofertaOp = ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			Oferta oferta = ofertaOp.get();
			oferta.setEstado(false);
			this.ofertaRepository.save(oferta);
			oferta.setRespuesta(ofertaRequest.getRespuesta());
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/image/{id}")
	public ResponseEntity<Resource> getImagen(@PathVariable("id") Long id) {
		System.out.println(" -------- Fetching URL de id = " + id + " -------- ");
		Oferta of = ofertaRepository.findById(id).get();
		System.out.println(" -------- Recibido url de id = " + id + " URL = " + of.getImagenUrl() + "-------- ");
		Resource image = imageService.load(of.getImagenUrl());
		if (image == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(image);
	}

}
