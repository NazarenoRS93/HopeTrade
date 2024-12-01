package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.DonacionTarjeta;


public interface DonacionTarjetaRepository extends JpaRepository<DonacionTarjeta, Long>{
	Optional<DonacionTarjeta> findDonacionTarjetaById(Long id);
}
