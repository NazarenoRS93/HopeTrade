package is2.g57.hopetrade.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import is2.g57.hopetrade.entity.state.PublicacionState;

public interface PublicacionStateRepository extends JpaRepository<PublicacionState, Long> {
    Optional<PublicacionState> findByNombre(String name);
}
