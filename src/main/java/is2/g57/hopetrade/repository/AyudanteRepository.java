package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import is2.g57.hopetrade.entity.Ayudante;

@Repository
public interface AyudanteRepository extends JpaRepository<Ayudante, Long>{
	Optional<Ayudante> findAyudanteByMail(String mail);
	Optional<Ayudante> findAyudanteByDni(String dni);
}
