package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.Tarjeta;


public interface TarjetaRepository extends JpaRepository<Tarjeta, Long>{
	Optional<Tarjeta> findTarjetaById(Long id);
	Optional<Tarjeta> findTarjetaByNumero(String numero);
}
