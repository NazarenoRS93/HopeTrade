package is2.g57.hopetrade.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.Oferta;


public interface OfertaRepository extends JpaRepository<Oferta, Long> {
 Optional<Oferta> findById(Long id);
 Iterable<Oferta> findAllByUserId(Long userId);
 Iterable<Oferta> findAllByPublicacionId(Long publicacionId);
 Iterable<Oferta> findAllByFilialId(Long filialId);
 
 Integer countByPublicacionId(Long publicacionId);
}