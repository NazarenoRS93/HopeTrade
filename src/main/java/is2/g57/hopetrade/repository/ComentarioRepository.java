package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import is2.g57.hopetrade.entity.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    Optional<Comentario> findComentarioByIdComentario(Long idComentario);
    Iterable<Comentario> findByUserId(Long id);
    Iterable<Comentario> findByPublicacionId(Long id);
}
