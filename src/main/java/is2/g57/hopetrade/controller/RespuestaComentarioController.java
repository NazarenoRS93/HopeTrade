package is2.g57.hopetrade.controller;

import is2.g57.hopetrade.entity.Comentario;
import is2.g57.hopetrade.entity.RespuestaComentario;
import is2.g57.hopetrade.repository.RespuestaComentarioRepository;
import is2.g57.hopetrade.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/respuesta-comentario")
public class RespuestaComentarioController {

	@Autowired
	private RespuestaComentarioRepository respuestaComentarioRepository;

	@Autowired
	private MailService mailService; // Asumiendo que tienes un servicio de correo electrónico

	@GetMapping("/{id}")
	public ResponseEntity<?> ObtenerRespuestaAComentario(
			@RequestBody RespuestaComentarioRequest respComentarioRequest) {
		Optional<RespuestaComentario> respComentarioOp = this.respuestaComentarioRepository
				.findById(respComentarioRequest.getId());
		if (respComentarioOp.isPresent()) {
			return new ResponseEntity<>(respComentarioOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No se encontro Ayudante", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarRespuestaDeComentario(
			@RequestBody RespuestaComentarioRequest respComentarioRequest) {
		if (respComentarioRequest.getText().length() > 100) {
			return new ResponseEntity<>("Debes ingresar menos de 100 caracteres", HttpStatus.BAD_REQUEST);
		}
		try {
			// Crear una nueva respuesta de comentario
			RespuestaComentario nuevaRespuesta = new RespuestaComentario(respComentarioRequest.getText(),
					respComentarioRequest.getUser(), respComentarioRequest.getComentario());
			// Guardar la nueva respuesta en la base de datos
			respuestaComentarioRepository.save(nuevaRespuesta);
			// Puedes enviar un correo electrónico aquí usando el servicio de correo
			mailService.SentEmailRespuestaRecibida(nuevaRespuesta);
			return new ResponseEntity<>("Respuesta enviada con exito", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("Error al crear una res", HttpStatus.CREATED);
		}

	}

	@GetMapping("/user/{id}")
	public Iterable<RespuestaComentario> obtenerRespuestaComentariosPorUserId(@PathVariable(value = "id") Long id) {
		return respuestaComentarioRepository.findByUserId(id);
	}


}
