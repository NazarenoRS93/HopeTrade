package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;



public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findUserById(Long id);
	Optional<User> findUserByDni(String dni);
	Optional<User> findUserByEmail(String mail);
}
