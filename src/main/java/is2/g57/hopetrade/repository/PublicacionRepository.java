package is2.g57.hopetrade.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.state.PublicacionState;

public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
    List<Publicacion> findAllByUserID(Long userID);

    List<Publicacion> findByUserIDAndState(Long userID, PublicacionState state);

    Optional<Publicacion> findById(Long id);

    @Query("SELECT p FROM Publicacion p WHERE p.state.nombre = :statename1 OR p.state.nombre = :statename2")
    List<Publicacion> findByStates(@Param("statename1") String statename1, @Param("statename2") String statename2);

    @Query("SELECT p FROM Publicacion p WHERE p.userID = :userID AND (p.state.nombre = :statename1 OR p.state.nombre = :statename2)")
    List<Publicacion> findByUserIdAndStates(@Param ("userID") Long userID, @Param("statename1") String statename1, @Param("statename2") String statename2);

    @Query("SELECT p FROM Publicacion p WHERE p.state.nombre = :statename")
    List<Publicacion> findByState(@Param("statename") String statename);

    @Query("SELECT p FROM Publicacion p WHERE p.userID = :userID AND p.state.nombre = :statename")
    List<Publicacion> findByUserIdAndState(@Param ("userID") Long userID, @Param("statename") String statename);

    @Query("SELECT p FROM Publicacion p WHERE p.categoria.id = :catID")
    List<Publicacion> findByCategoriaID(@Param("catID") Long catID);
}