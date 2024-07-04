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
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.ComentarioRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.repository.UserRepository;

@Component
@Order(6)
public class ComentarioLoader implements ApplicationRunner {
  @Autowired
  private ComentarioRepository comentarioRepository;
  
  @Autowired
  private PublicacionRepository publicacionRepository;
  
  @Autowired
  private UserRepository userRepository;
  
  @Override
  public void run(ApplicationArguments args) throws Exception {
    List<String[]> comentarios = Arrays.asList(
      new String[] { "¿De que año es?", "3", "5" },
      new String[] { "¿Es de una plaza o de dos?", "5", "2" },
      new String[] { "¿De verdad es rico?", "4", "1" },
      new String[] { "Malisima la publicacion", "5", "1" },
      new String[] { "¿Cual es la marca?", "3", "5" }
    );

    if (comentarioRepository.count() == 0) {
      System.out.println("Cargando comentarios...");
      for (String[] c : comentarios) {
        System.out.println("Procesando comentario: " + Arrays.toString(c));
        Optional<User> userOp = userRepository.findById(Long.parseLong(c[1]));
        Optional<Publicacion> publicacionOp = publicacionRepository.findById(Long.parseLong(c[2]));
        
        if (userOp.isPresent() && publicacionOp.isPresent()) {
          Comentario comentario = new Comentario(c[0], userOp.get(), publicacionOp.get());
          Random random = new Random();
          int hora = random.nextInt(14) + 1;
          int minuto = random.nextInt(59) + 1;
          comentario.setFechaComentario(LocalDateTime.of(2024, 07, 7, hora, minuto));
          
          comentarioRepository.save(comentario);
          System.out.println("Comentario guardado: " + comentario);
        } else {
          if (!userOp.isPresent()) {
            System.out.println("Usuario no encontrado con ID: " + c[1]);
          }
          if (!publicacionOp.isPresent()) {
            System.out.println("Publicacion no encontrada con ID: " + c[2]);
          }
        }
      }
    } else {
      System.out.println("Comentarios ya cargados en la base de datos.");
    }
  }
}
