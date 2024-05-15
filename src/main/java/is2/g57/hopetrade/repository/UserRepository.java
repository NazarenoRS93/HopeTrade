package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import is2.g57.hopetrade.entity.User;



public interface UserRepository extends JpaRepository<User, Long>{
	// Optional<User> findById(Long id);
	// Optional<User> findByDni(String dni);
	// public Optional<User>findByMail(String mail);
}
