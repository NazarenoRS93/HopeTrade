package is2.g57.hopetrade.controller;

import is2.g57.hopetrade.entity.Comentario;
import is2.g57.hopetrade.entity.RespuestaComentario;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.ComentarioRepository;
import is2.g57.hopetrade.repository.RespuestaComentarioRepository;
import is2.g57.hopetrade.repository.UserRepository;
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
	private UserRepository userRepository;

	@Autowired
	private ComentarioRepository comentarioRepository;

	@Autowired
	private MailService mailService; // Asumiendo que tienes un servicio de correo electrónico

	@GetMapping("/{id}")
	public ResponseEntity<?> ObtenerRespuestaAComentario(@PathVariable(value = "id") Long id) {
		try {
			Optional<RespuestaComentario> respuestaComentarioOp = this.respuestaComentarioRepository
					.findByComentarioIdComentario(id); // Utilizando el nuevo método
			if (respuestaComentarioOp.isPresent()) {
				return new ResponseEntity<>(respuestaComentarioOp.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>("No existe una respuesta para este comentario.", HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Error al obtener la respuesta: " + e, HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarRespuestaDeComentario(
			@RequestBody RespuestaComentarioRequest respComentarioRequest) {
		try {
			System.out.println("user " + respComentarioRequest.getIdUser() + " coment "
					+ respComentarioRequest.getIdComentario() + " text: " + respComentarioRequest.getText());
			Optional<User> oPuser = this.userRepository.findById(respComentarioRequest.getIdUser());
			Optional<Comentario> oPComent = this.comentarioRepository.findById(respComentarioRequest.getIdComentario());
			// Crear una nueva respuesta de comentario
			if (oPuser.isPresent() && oPComent.isPresent()) {
				RespuestaComentario nuevaRespuesta = new RespuestaComentario(respComentarioRequest.getText(),
						oPuser.get(), oPComent.get());
				respuestaComentarioRepository.save(nuevaRespuesta);
				mailService.SentEmailRespuestaRecibida(nuevaRespuesta);
				return new ResponseEntity<>("Respuesta enviada con exito", HttpStatus.CREATED);
			} else {
				throw new RuntimeException("Error");
			}

		} catch (Exception e) {
			return new ResponseEntity<>("Error al crear una res" + e, HttpStatus.CREATED);
		}

	}

	@GetMapping("/user/{id}")
	public Iterable<RespuestaComentario> obtenerRespuestaComentariosPorUserId(@PathVariable(value = "id") Long id) {
		return respuestaComentarioRepository.findByUserId(id);
	}

}
