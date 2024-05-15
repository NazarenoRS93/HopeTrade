package is2.g57.hopetrade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.repository.CrudRepository;
// import org.springframework.stereotype.Repository;

import is2.g57.hopetrade.entity.Publicacion;

public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
    Iterable<Publicacion> findAllByUserID(Long userID);
    Iterable<Publicacion> findByActiveTrue();
    Iterable<Publicacion> findByActiveFalse();
}