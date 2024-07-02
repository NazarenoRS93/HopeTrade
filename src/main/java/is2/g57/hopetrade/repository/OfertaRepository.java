package is2.g57.hopetrade.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.Oferta;


public interface OfertaRepository extends JpaRepository<Oferta, Long> {
 Optional<Oferta> findById(Long id);
 List<Oferta> findAllByUserId(Long userId);
 List<Oferta> findAllByPublicacionId(Long publicacionId);
 List<Oferta> findAllByFilialId(Long filialId);

 List<Oferta> findAllByPublicacionIdAndEstado(Long publicacionId, String estado);
 
 Integer countByPublicacionIdAndEstado(Long publicacionId, String estado);

 Integer countByPublicacionId(Long publicacionId);
}