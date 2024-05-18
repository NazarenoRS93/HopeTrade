package is2.g57.hopetrade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;

/*
 Llamados http para esta tabla:
 GET
 All: http://localhost:8080/publicacion
 All-Activas: http://localhost:8080/publicacion/activas
 All-Inactivas: http://localhost:8080/publicacion/inactivas
 Buscar por userID: http://localhost:8080/publicacion/buscar-por-user-id/{userID}
 Buscar por ID: http://localhost:8080/publicacion/{id}
  
 POST
 Add: http://localhost:8080/publicacion/add 
 con Header: Content-Type: "application/json"
 {
    "userID":"x",
    "titulo":"t",
    "descripcion":"d"
  }
 PUT:
 Update: http://localhost:8080/publicacion/update
 con Header: Content-Type: "application/json"
 {  
    "id":"i",
    "userID":"x",
    "titulo":"t",
    "descripcion":"d"
  }
  
 Pendientes:
 Baja logica (Activo = false)
 Eliminacion (no requerida)
 Buscar Activas/Inactivas por userID

 Data: Imagenes
 */

@RestController
@RequestMapping(path="/publicacion")
public class PublicacionController {
	@Autowired
	private PublicacionRepository publicacionRepository;

  private ResponseEntity<?> PublicacionTest(PublicacionDTO PublicacionDTO) {
    
    // Test UserID existe
    if (PublicacionDTO.getUserID() == null) {
      return new ResponseEntity<>("Se requiere el userID", HttpStatus.BAD_REQUEST);
    }

    // Test titulo > 0 y titulo < 50
    try {
      if (PublicacionDTO.getTitulo().length() > 50 || PublicacionDTO.getTitulo().length() < 1) {
        return new ResponseEntity<>("Ingrese un titulo de hasta 50 caracteres", HttpStatus.BAD_REQUEST);
      }
      if (PublicacionDTO.getDescripcion().length() > 240) {
        return new ResponseEntity<>("La descripcion puede tener hasta 240 caracteres", HttpStatus.BAD_REQUEST);
      }
    } catch (Exception e) {
      return new ResponseEntity<>("Hubo un error", HttpStatus.BAD_REQUEST);
    }

    // Test (userID, Titulo) no existe en DB
    try {
      Iterable<Publicacion> publicacion = publicacionRepository.findAllByUserID(PublicacionDTO.getUserID());
      for (Publicacion p : publicacion) {
        if (p.getTitulo().equals(PublicacionDTO.getTitulo()) && p.isActivo() && p.getId() != PublicacionDTO.getId()) {
          return new ResponseEntity<>("Ya hay una publicacion activa con ese titulo", HttpStatus.BAD_REQUEST);
        }
      }
    } catch (Exception e) {
      return new ResponseEntity<>("Hubo un error", HttpStatus.BAD_REQUEST);
    }

    return null;
  }

  @PostMapping("/add")
  public ResponseEntity<?> addNewPublicacion(@RequestBody PublicacionDTO PublicacionDTO) {
    
    System.out.println("TEST");
    // Test titulo > 0 y titulo < 50
    ResponseEntity<?> test = PublicacionTest(PublicacionDTO);
    if (test != null) {
      return test;
    }
    // OK
    publicacionRepository.save(new Publicacion(PublicacionDTO));
    return new ResponseEntity<>("Publicacion registrada", HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<?> updatePublicacion(@RequestBody PublicacionDTO PublicacionDTO) {
    // Test
    ResponseEntity<?> test = PublicacionTest(PublicacionDTO);
    if (test != null) {
      return test;
    }

    // Test ID incluido en paquete
    if (PublicacionDTO.getId() == null) {
      return new ResponseEntity<>("Se requiere el ID", HttpStatus.BAD_REQUEST);
    }

    // Test publicacion existe en BD
    Publicacion publicacion;
    try {
      publicacion = publicacionRepository.findById(PublicacionDTO.getId()).get();
    }
    catch (Exception e) {
      return new ResponseEntity<>("La publicacion no existe", HttpStatus.BAD_REQUEST);
    }
    // Test publicacion inactiva ( No se si es requerimiento )
    if (!publicacion.isActivo()) return new ResponseEntity<>("La publicacion esta cerrada y no puede modificarse", HttpStatus.BAD_REQUEST);

    // OK
    publicacion.update(PublicacionDTO);
    publicacionRepository.save(publicacion);
    return new ResponseEntity<>("Publicacion actualizada", HttpStatus.OK);
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
