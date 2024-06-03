package is2.g57.hopetrade.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.Intercambio;

public interface IntercambioRepository extends JpaRepository<Intercambio, Integer>{

    Optional<Intercambio> findById(Long id);
}
