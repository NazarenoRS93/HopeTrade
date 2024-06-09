package is2.g57.hopetrade.controller;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;
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

import is2.g57.hopetrade.dto.OfertaDTO;
import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.mapper.OfertaMapper;
import is2.g57.hopetrade.repository.IntercambioRepository;
import is2.g57.hopetrade.repository.OfertaRepository;
import is2.g57.hopetrade.services.ImageService;

@RestController
@RequestMapping("/oferta")
public class OfertaController {

	@Autowired
	private OfertaRepository ofertaRepository;

	@Autowired
	private OfertaMapper ofertaMapper;

	@Autowired
	private ImageService imageService;
	
	@Autowired 
	private IntercambioRepository intercambioRepository;

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarOferta(@RequestBody OfertaDTO ofertaDTO) {

		try {

			// fecha valida para testeo (08-07-2024 08:00:00)
			LocalDateTime fecha = LocalDateTime.of(2024, 07, 8, 9, 0, 0);
			ofertaDTO.setFechaIntercambio(fecha);
			
			// Linea correcta para testear pasaje desde Frontend
			// LocalDateTime fecha = ofertaDTO.getFechaIntercambio();

			// Verificar que el día esté entre lunes y viernes
			DayOfWeek dia = fecha.getDayOfWeek();
			boolean esDiaLaborable = dia != DayOfWeek.SATURDAY && dia != DayOfWeek.SUNDAY;

			// Verificar que la hora esté entre las 08:00 y las 20:00
			int hora = fecha.getHour();
			boolean enHorarioLaboral = hora >= 8 && hora < 20;

			if (esDiaLaborable && enHorarioLaboral) {
				// Oferta oferta = new Oferta(ofertaRequest.getTexto(), fecha, ofertaRequest.getImagenUrl(), ofertaRequest.getPublicacion(),ofertaRequest.getFilial(),ofertaRequest.getUser());
				Oferta oferta = ofertaMapper.map(ofertaDTO);
				System.out.println("------- Saving Oferta -------");
				ofertaRepository.save(oferta);
				System.out.println("------- Guardada -------");
				return new ResponseEntity<>("¡Oferta creada exitosamente!", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(
						"La fecha y hora del intercambio deben estar entre lunes y viernes de 08:00 a 20:00.",
						HttpStatus.BAD_REQUEST);

			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error al procesar la solicitud", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> obtenerOfertaPorId(@PathVariable("id") Long ofertaId) {
		Optional<Oferta> ofertaOp = this.ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			return new ResponseEntity<>(ofertaMapper.map(ofertaOp.get()), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/user/{userId}")
	public @ResponseBody Iterable<OfertaDTO> buscarOfertaPorUserId(@PathVariable ("userId") Long userId) {
		List<OfertaDTO> oferta = ofertaRepository.findAllByUserId(userId).stream().map(ofertaMapper::map).toList();
		return oferta;
	}

	@GetMapping("/filial/{filialId}")
	public @ResponseBody List<OfertaDTO> buscarOfertaPorFilialId(@PathVariable("filialId") Long filialId) {
		List<OfertaDTO> oferta = ofertaRepository.findAllByFilialId(filialId).stream().map(ofertaMapper::map).toList();
		return oferta;
	}

	@GetMapping("/publicacion/{publicacionId}")
	public @ResponseBody Iterable<OfertaDTO> buscarOfertaPorPublicacionId(@PathVariable("publicacionId") Long publicacionId) {
		List<OfertaDTO> oferta = ofertaRepository.findAllByPublicacionId(publicacionId).stream().map(ofertaMapper::map).toList();
		return oferta;
	}

	@PostMapping("/aceptar/{id}")
	public ResponseEntity<?> aceptarOferta(@PathVariable("id") Long ofertaId) {
		Optional<Oferta> ofertaOp = ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			Oferta oferta = ofertaOp.get();
			oferta.setEstado(true);
		    this.ofertaRepository.save(oferta);
		    Intercambio intercambio = new Intercambio(oferta.getPublicacion(), oferta, "Pendiente");
		    this.intercambioRepository.save(intercambio);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/rechazar/{id}")
	public ResponseEntity<?> rechazarOferta(@PathVariable("id") Long ofertaId, @RequestBody String respuesta) {
		Optional<Oferta> ofertaOp = ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			Oferta oferta = ofertaOp.get();
			oferta.setEstado(false);
			if (respuesta != null) {
				oferta.setRespuesta(respuesta);
			}
			this.ofertaRepository.save(oferta);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}

	}

}
