package is2.g57.hopetrade.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import is2.g57.hopetrade.entity.Comentario;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.ComentarioRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.repository.UserRepository;
import is2.g57.hopetrade.services.MailService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/comentario")
public class ComentarioController {

	@Autowired
	private ComentarioRepository comentarioRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PublicacionRepository publicacionRepository;

	@Autowired
	private MailService mailService;

	@GetMapping("/{id_comentario}")
	public ResponseEntity<?> obtenerComentarioPorId(@PathVariable(value = "id_comentario") Long id) {
		Optional<Comentario> comentarioOp = this.comentarioRepository.findById(id);
		if (comentarioOp.isPresent()) {
			return new ResponseEntity<>(comentarioOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/guardar")
	public ResponseEntity<?> guardarComentario(@RequestBody ComentarioRequest request){
		try {
			Optional<User> userOp = this.userRepository.findById(request.getUserId());
			Optional<Publicacion> publicacionOp = this.publicacionRepository.findById(request.getPublicacionId());
			if (userOp.isPresent() && publicacionOp.isPresent()) {
		Comentario comentario = new Comentario(request.getText(),userOp.get(),publicacionOp.get());
		mailService.sendEmailComentarioRecibido(userOp.get(),publicacionOp.get());
		this.comentarioRepository.save(comentario);
		return new ResponseEntity<> ("¡Comentario creado exitosamente!",HttpStatus.CREATED);}
			else { throw new RuntimeException("Error"); }
	} catch (Exception e) {
		return new ResponseEntity<> ("Error al crear comentario",HttpStatus.BAD_REQUEST);
	
	}
	}
	
	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<?> deleteComentario (@PathVariable(value = "id") Long id) {
		Optional<Comentario> comentarioOp = this.comentarioRepository.findById(id);
		if (comentarioOp.isPresent()) {
			Comentario comentario = comentarioOp.get();
			comentario.setActivo(false);
			comentario.setRespuestaComentario(null);
			this.comentarioRepository.save(comentario);
			return new ResponseEntity<> ("Comentario dado de baja exitosamente", HttpStatus.OK);
		} else return new ResponseEntity<> ("Error eliminando comentario", HttpStatus.BAD_REQUEST);
	}
	

	@GetMapping("/user/{id}")
	public Iterable<Comentario> obtenerComentariosPorUserId(@PathVariable(value = "id") Long id) {
		return comentarioRepository.findAllByUserId(id);
	}

	@GetMapping("/publicacion/{id}")
	public Iterable<Comentario> obtenerComentariosPorPublicacion(@PathVariable(value = "id") Long id) {
		return comentarioRepository.findAllByPublicacionId(id);
	}

}
