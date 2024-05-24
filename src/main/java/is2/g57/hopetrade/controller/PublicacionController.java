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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.core.io.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.services.ImageService;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;

/*
 Interfaz http para esta tabla:
 GET
 All: http://localhost:8080/publicacion/all
 Retorna: List<Publicacion>
 {
    "id": long,
    "userID": long,
    "titulo": string,
    "descripcion": string,
    "imagenUrl": string
    "active": boolean
    "ultimaModificacion": Date
    "fechaHoraCreacion": Date
 }
 
 All-Activas: http://localhost:8080/publicacion/all/activas
 All-Inactivas: http://localhost:8080/publicacion//all/inactivas
 Buscar por userID: http://localhost:8080/publicacion/user/{userID}
 Activas por userID: http://localhost:8080/publicacion/user/{userID}/activas
 Inactivas por userID: http://localhost:8080/publicacion/user/{userID}/inactivas
 Buscar por ID: http://localhost:8080/publicacion/{id}
 Fetch imagen por ID Publicacion : http://localhost:8080/publicacion/image/{id}
  
 POST
 Add: http://localhost:8080/publicacion/add 
 {
    "userID": long,
    "titulo": string,
    "descripcion": string,
    "image": MultipartFile
  }

 PUT:
 Update: http://localhost:8080/publicacion/update
 {  
    "id": long,
    "userID": long,
    "titulo": string,
    "descripcion": string,
    "image": MultipartFile
  }
  activar: http://localhost:8080/publicacion/activar/{id}
  desactivar: http://localhost:8080/publicacion/desactivar/{id}
 */

@RestController
@RequestMapping(path="/publicacion")
public class PublicacionController {
	@Autowired
	private PublicacionRepository publicacionRepository;

  @Autowired
  private ImageService imageService;

  // @Autowired
  // private ImageService imageService;
  
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

    // Test imagen está en el DTO
    if (PublicacionDTO.getImageData() == null) {
      return new ResponseEntity<>("Se requiere la imagen", HttpStatus.BAD_REQUEST);
    }

    return null;
  }

  @PostMapping("/add")
  public ResponseEntity<?> addNewPublicacion(
    @RequestParam("titulo") String titulo,
    @RequestParam("descripcion") String descripcion,
    @RequestParam("userID") Long userID,
    @RequestParam("image") MultipartFile image) {

    PublicacionDTO publicacionDTO = new PublicacionDTO();
    publicacionDTO.setTitulo(titulo);
    publicacionDTO.setDescripcion(descripcion);
    publicacionDTO.setUserID(userID);
    publicacionDTO.setImageData(image);

    // Test 
    ResponseEntity<?> test = PublicacionTest(publicacionDTO);
    if (test != null) {
      return test;
    }
    if (image == null) return new ResponseEntity<>("Se requiere una imagen", HttpStatus.BAD_REQUEST);

    String imageUrl = imageService.saveUnique(image);

    Publicacion p = new Publicacion(publicacionDTO, imageUrl);

    // OK
    publicacionRepository.save(p);
    return new ResponseEntity<>("Publicacion registrada", HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<?> updatePublicacion(    
  @RequestParam("titulo") String titulo,
  @RequestParam("descripcion") String descripcion,
  @RequestParam("userID") Long userID,
  @RequestParam(name="image", required = false) MultipartFile image) {

    PublicacionDTO PublicacionDTO = new PublicacionDTO();
    PublicacionDTO.setTitulo(titulo);
    PublicacionDTO.setDescripcion(descripcion);
    PublicacionDTO.setUserID(userID);
    PublicacionDTO.setImageData(image);

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

    publicacion.update(PublicacionDTO);

    if (image != null) {
      imageService.delete(publicacion.getImagenUrl());
      String imageUrl = imageService.save(image);
      publicacion.setImagenUrl(imageUrl);
    }

    // OK
    publicacionRepository.save(publicacion);
    return new ResponseEntity<>("Publicacion actualizada", HttpStatus.OK);
  }

  @PutMapping("/desactivar/{id}")
  public ResponseEntity<?> desactivarPublicacion(@PathVariable(value = "id") Integer publicacionId) {
    Optional<Publicacion> oPublicacion = publicacionRepository.findById(publicacionId);
    if(!oPublicacion.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    Publicacion publicacion = oPublicacion.get();
    publicacion.desactivar();
    publicacionRepository.save(publicacion);
    return ResponseEntity.ok(publicacion);
  }

  @PutMapping("/activar/{id}")
  public ResponseEntity<?> activarPublicacion(@PathVariable(value = "id") Integer publicacionId) {
    Optional<Publicacion> oPublicacion = publicacionRepository.findById(publicacionId);
    if(!oPublicacion.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    Publicacion publicacion = oPublicacion.get();

    // Check que no exista pub activa con el mismo titulo
    try {
      Iterable<Publicacion> publicaciones = publicacionRepository.findAllByUserID(publicacion.getUserID());
      for (Publicacion p : publicaciones) {
        if (p.getTitulo().equals(publicacion.getTitulo()) && p.isActivo() && p.getId() != publicacion.getId()) {
          return new ResponseEntity<>("Ya hay una publicacion activa con ese titulo", HttpStatus.BAD_REQUEST);
        }
      }
    } catch (Exception e) {
      return new ResponseEntity<>("Hubo un error", HttpStatus.BAD_REQUEST);
    }

    publicacion.activar();
    publicacionRepository.save(publicacion);
    return ResponseEntity.ok(publicacion);
  }
	
	@GetMapping("/{id}")
	public ResponseEntity<?> read(@PathVariable(value = "id") Integer publicacionId){
		Optional<Publicacion> oPublicacion = publicacionRepository.findById(publicacionId);
		if(!oPublicacion.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(oPublicacion);
	}	

  @GetMapping("/image/{id}")
  public ResponseEntity<Resource> getImagen(@PathVariable Long id) {
    System.out.println(" -------- Fetching URL de id = " + id + " -------- ");
    Publicacion pub = publicacionRepository.findById(id).get();
    System.out.println(" -------- Recibido url de id = " + id + " URL = " + pub.getImagenUrl() + "-------- ");
    Resource image = imageService.load(pub.getImagenUrl());
    if (image == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok()
                .body(image);
  }
  

  @GetMapping("/user/{userID}")
    public @ResponseBody Iterable<Publicacion> buscarPublicacionPorUserId(@PathVariable Long userID) {
        Iterable<Publicacion> publicacion = publicacionRepository.findAllByUserID(userID);
        return publicacion;
    }
  @GetMapping("/user/{userID}/activas")
    public @ResponseBody Iterable<Publicacion> buscarActivasPorUserId(@PathVariable Long userID) {
        Iterable<Publicacion> publicacion = publicacionRepository.findByUserIDAndActiveTrue(userID);
        return publicacion;
    }
  @GetMapping("/user/{userID}/inactivas")
    public @ResponseBody Iterable<Publicacion> buscarInactivasPorUserId(@PathVariable Long userID) {
        Iterable<Publicacion> publicacion = publicacionRepository.findByUserIDAndActiveFalse(userID);
        return publicacion;
    }
    

  @GetMapping(path="/all")
  public @ResponseBody Iterable<Publicacion> getAllPublicaciones() {
    System.out.println("----- Fetching Publicaciones ------");
    return publicacionRepository.findAll();
  }

  @GetMapping(path="/all/activas")
  public @ResponseBody Iterable<Publicacion> getAllPublicacionesActivas() {
    return publicacionRepository.findByActiveTrue();
  }

  @GetMapping(path="/all/inactivas")
  public @ResponseBody Iterable<Publicacion> getAllPublicacionesInactivas() {
    return publicacionRepository.findByActiveFalse();
  }
}
