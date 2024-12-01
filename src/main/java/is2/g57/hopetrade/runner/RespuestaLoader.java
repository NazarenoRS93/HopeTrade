package is2.g57.hopetrade.runner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Random;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.entity.Comentario;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.RespuestaComentario;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.ComentarioRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.repository.RespuestaComentarioRepository;
import is2.g57.hopetrade.repository.UserRepository;

@Component
@Order(7)
public class RespuestaLoader implements ApplicationRunner {
	@Autowired
	private RespuestaComentarioRepository respuestaRepository;

	@Autowired
	private ComentarioRepository comentarioRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		List<String[]> comentarios = Arrays.asList(
				new String[] { "Hola, es de 2018", "4", "1" },
				new String[] { "Buenas, es de 2 plazas", "4", "2" }
				);

		if (respuestaRepository.count() == 0) {
			System.out.println("Cargando Respuestas...");
			for (String[] c : comentarios) {
				System.out.println("Procesando respuesta: " + Arrays.toString(c));
				Optional<User> userOp = userRepository.findById(Long.parseLong(c[1]));
				Optional<Comentario> comentarioOp = comentarioRepository.findById(Long.parseLong(c[2]));
				if (userOp.isPresent() && comentarioOp.isPresent()) {
					RespuestaComentario respuesta = new RespuestaComentario(c[0], userOp.get(), comentarioOp.get());
					Random random = new Random();
					int hora = random.nextInt(9) + 15;
					int minuto = random.nextInt(59) + 1;
					respuesta.setFechaRespuesta(LocalDateTime.of(2024, 07, 07, hora, minuto));
					respuestaRepository.save(respuesta);
				}
			}
		}
	}
}
