package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import is2.g57.hopetrade.entity.Filial;



public interface FilialRepository extends JpaRepository<Filial, Long>{
	Optional<Filial> findById(Long id);
	Optional<Filial> findByNombre(String nombre);
	Optional<Filial> findByDireccion(String direccion);
	
}
