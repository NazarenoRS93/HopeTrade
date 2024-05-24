package is2.g57.hopetrade.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import is2.g57.hopetrade.entity.Categoria;

import java.util.List;
import java.util.Optional;


public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNombre(String nombre);
}
