package is2.g57.hopetrade.repository;

import java.sql.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.RelAyudanteFilial;
import is2.g57.hopetrade.entity.RelAyudanteFillialId;



public interface RelAyudanteFilialRepository extends JpaRepository<RelAyudanteFilial, RelAyudanteFillialId>{
	// Optional<RelAyudanteFilial> findByIdIdAyudante(Long idAyudante);
    // Optional<RelAyudanteFilial> findByIdFilial(Long idFillial);
    // Optional<RelAyudanteFilial> findByFecha(Date fecha);
}