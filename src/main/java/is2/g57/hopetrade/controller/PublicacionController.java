package is2.g57.hopetrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Optional;

import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.entity.Publicacion;

/*
 Llamados http para esta tabla:
 GET
 All: http://localhost:8080/publicacion
 All-Activas: http://localhost:8080/publicacion/activas
 All-Inactivas: http://localhost:8080/publicacion/inactivas
 Buscar por userID: http://localhost:8080/publicacion/buscar-por-user-id/{userID}
 Buscar por ID: http://localhost:8080/publicacion/{id}
  
 POST
 Add: http://localhost:8080/publicacion/add { PARAMS: userID, titulo, descripcion }
 ^ Tambien acepta una ranciada en la direccion: http://localhost:8080/publicacion/add?userID={ID}&titulo={titulo}&descripcion={descripcion}

 Pendientes:
 Modificacion
 Baja logica (Activo = false)
 Eliminacion (no requerida)
 Buscar Activas/Inactivas por userID

 Logica de campos
 Imagenes
 */

@RestController
@RequestMapping(path="/publicacion")
public class PublicacionController {
	@Autowired
	private PublicacionRepository publicacionRepository;
	
  @PostMapping(path="/add")
  public @ResponseBody String addNewPublicacion (@RequestParam long userID, @RequestParam String titulo, @RequestParam String descripcion) {
    // Test titulo > 0 y titulo < 50

    // Test descripcion > 0 y descripcion < 240

    // Test (userID, Titulo) no existe en DB

    // ok
    Publicacion p = new Publicacion();
    p.setTitulo(titulo);
    p.setDescripcion(descripcion);
    p.setUserID(userID);
    publicacionRepository.save(p);

    return "Saved";
  }
	
	@GetMapping("/{id}")
	public ResponseEntity<?> read(@PathVariable(value = "id") Integer publicacionId){
		Optional<Publicacion> oPublicacion = publicacionRepository.findById(publicacionId);
		if(!oPublicacion.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(oPublicacion);
	}	

  @GetMapping("/buscar-por-user-id/{userID}")
    public @ResponseBody Iterable<Publicacion> buscarPublicacionPorUserId(@PathVariable Long userID) {
        Iterable<Publicacion> publicacion = publicacionRepository.findAllByUserID(userID);
        return publicacion;
    }

  @GetMapping(path="")
  public @ResponseBody Iterable<Publicacion> getAllPublicaciones() {
    return publicacionRepository.findAll();
  }

  @GetMapping(path="/activas")
  public @ResponseBody Iterable<Publicacion> getAllPublicacionesActivas() {
    return publicacionRepository.findByActiveTrue();
  }

  @GetMapping(path="/inactivas")
  public @ResponseBody Iterable<Publicacion> getAllPublicacionesInactivas() {
    return publicacionRepository.findByActiveFalse();
  }
}
