package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.DonacionEnFilial;


public interface DonacionEnFilialRepository extends JpaRepository<DonacionEnFilial, Long>{
	Optional<DonacionEnFilial> findDonacionEnFilialById(Long id);
}
