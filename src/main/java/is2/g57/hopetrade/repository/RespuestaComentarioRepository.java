package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import is2.g57.hopetrade.entity.RespuestaComentario;

public interface RespuestaComentarioRepository extends JpaRepository<RespuestaComentario, Long> {
    Optional<RespuestaComentario> findById(Long id);
    Iterable<RespuestaComentario> findByUserId(Long id);
    Optional<RespuestaComentario> findByComentarioIdComentario(Long idComentario);
}