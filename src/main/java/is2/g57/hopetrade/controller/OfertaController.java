package is2.g57.hopetrade.controller;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import is2.g57.hopetrade.dto.OfertaDTO;
import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.mapper.OfertaMapper;
import is2.g57.hopetrade.repository.IntercambioRepository;
import is2.g57.hopetrade.repository.OfertaRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.services.ImageService;
import is2.g57.hopetrade.services.MailService;

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

	@Autowired
	private PublicacionRepository publicacionRepository;
	
	@Autowired
    private MailService emailService;

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarOferta(@RequestBody OfertaDTO ofertaDTO) {

		try {
			LocalDateTime fecha = ofertaDTO.getFechaIntercambio();
			// Verificar que el día esté entre lunes y viernes
			DayOfWeek dia = fecha.getDayOfWeek();
			boolean esDiaLaborable = dia != DayOfWeek.SATURDAY && dia != DayOfWeek.SUNDAY;
			// Verificar que la hora esté entre las 08:00 y las 20:00
			int hora = fecha.getHour();
			boolean enHorarioLaboral = hora >= 8 && hora < 20;
			if (esDiaLaborable && enHorarioLaboral) {
				Oferta oferta = ofertaMapper.map(ofertaDTO);
				ofertaRepository.save(oferta);
				emailService.sendEmailOfertaRecibida(oferta);
				return new ResponseEntity<>("¡Oferta creada exitosamente!", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(
						"La fecha y hora del intercambio debe ser de lunes a viernes y de 08:00 a 20:00.",
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

	@PutMapping("/aceptar/{id}")
	public ResponseEntity<?> aceptarOferta(@PathVariable("id") Long ofertaId) {
		System.out.println("ACEPTANDING");
		Optional<Oferta> ofertaOp = ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			Oferta oferta = ofertaOp.get();
			oferta.aceptar();

			System.out.println("UPDATING OFERTA");
		    this.ofertaRepository.save(oferta);

			System.out.println("RESERVANDO PUBLICACION");
			Publicacion publicacion = oferta.getPublicacion();
			publicacion.reservar();
			this.publicacionRepository.save(publicacion);

			System.out.println("CREANDO INTERCAMBIO");
			Intercambio intercambio = new Intercambio();
			intercambio.setPublicacion(publicacion);
			intercambio.setOferta(oferta);
		    this.intercambioRepository.save(intercambio);

			System.out.println("ENVIANDO CORREO");
		    emailService.sendEmailOfertaAceptada(oferta);

			System.out.println("ELIMINANDO OFERTAS RESTANTES");
			List<Oferta> ofertas = ofertaRepository.findAllByPublicacionId(oferta.getPublicacion().getId());
			ofertas.remove(oferta);
			for (Oferta o : ofertas) {
				o.rechazar();
				o.setRespuesta("Otra oferta fue aceptada.");
				emailService.sendEmailOfertaRechazada(o);
				this.ofertaRepository.save(o);
			}

			return new ResponseEntity<>("Oferta aceptada.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/rechazar/{id}")
	public ResponseEntity<?> rechazarOferta(@PathVariable Long id, @RequestParam String respuesta) {

		System.out.println("RECHAZANDO");
		System.out.println("RESPUESTA: " + respuesta);

		Optional<Oferta> ofertaOp = ofertaRepository.findById(id);
		if (ofertaOp.isPresent()) {
			Oferta oferta = ofertaOp.get();
			oferta.rechazar();
			if (respuesta != null) {
				oferta.setRespuesta(respuesta);
			}
			else {
				oferta.setRespuesta("[PLACEHOLDER]");
			}

			this.ofertaRepository.save(oferta);
			emailService.sendEmailOfertaRechazada(oferta);
			return new ResponseEntity<>("Oferta rechazada.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro la oferta", HttpStatus.NOT_FOUND);
		}

	}

	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<?> eliminarOferta(@PathVariable("id") Long ofertaId) {
		Optional<Oferta> ofertaOp = ofertaRepository.findById(ofertaId);
		if (ofertaOp.isPresent()) {
			Oferta oferta = ofertaOp.get();
			emailService.sendEmailOfertaRechazada(oferta);
		}
		this.ofertaRepository.deleteById(ofertaId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
