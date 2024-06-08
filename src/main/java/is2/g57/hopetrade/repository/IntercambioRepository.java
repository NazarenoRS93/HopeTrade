package is2.g57.hopetrade.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.entity.Intercambio;

public interface IntercambioRepository extends JpaRepository<Intercambio, Integer>{

    Optional<Intercambio> findById(Long id);

    // JOIN with oferta.filial
    @Query ("SELECT i FROM Intercambio i WHERE i.oferta.filial = :filial")
    List<Intercambio> findAllByFilial(Filial filial);
}
