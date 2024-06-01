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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.repository.PublicacionStateRepository;
import is2.g57.hopetrade.services.ImageService;
import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.mapper.PublicacionMapper;

/*
 Interfaz http para esta tabla:
 GET
 All: http://localhost:8080/publicacion/all
 Retorna: List<PublicacionDTO>
 {
    Long id;
    String titulo;
    String descripcion;
    Long userID;
    String imagen (base64);
    String categoria;
    boolean active; ( Creo que no hace nada a esta altura )
    LocalDateTime fechaHoraCreacion;
    LocalDateTime ultimaModificacion;
    String estado;
    long estadoID;
 }

 All-Activas: http://localhost:8080/publicacion/all/activas
 All-Finalizadas: http://localhost:8080/publicacion//all/finalizadas
 Buscar por userID: http://localhost:8080/publicacion/user/{userID}
 Activas por userID: http://localhost:8080/publicacion/user/{userID}/activas
 Finalizadas por userID: http://localhost:8080/publicacion/user/{userID}/finalizadas
 Buscar por ID: http://localhost:8080/publicacion/{id}
 Fetch imagen por ID Publicacion : http://localhost:8080/publicacion/image/{id}
  
 POST
 Add: http://localhost:8080/publicacion/add 
 {
    "userID": long,
    "titulo": string,
    "descripcion": string,
    "imagen": string(base64)
    "categoria": string
  }

 PUT:
 Update: http://localhost:8080/publicacion/update
 {  
    "id": long,
    "userID": long,
    "titulo": string,
    "descripcion": string,
    "imagen": string(base64)
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
  
  @Autowired
  private PublicacionMapper publicacionMapper;

  @Autowired 
  private PublicacionStateRepository publicacionStateRepository;
  
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
    if (PublicacionDTO.getImagen() == null) {
      return new ResponseEntity<>("Se requiere la imagen", HttpStatus.BAD_REQUEST);
    }

    return null;
  }

  @PostMapping("/add")
  public ResponseEntity<?> addNewPublicacion(@RequestBody PublicacionDTO publicacionDTO) {
    System.out.println("----- Add Publicacion ------ categoria: " + publicacionDTO.getCategoria_ID());
    // Test
    ResponseEntity<?> test = PublicacionTest(publicacionDTO);
    if (test != null) {
      return test;
    }

    // Add
    Publicacion p = publicacionMapper.toNewPublicacion(publicacionDTO);
    publicacionRepository.save(p);
    return new ResponseEntity<>("Publicacion registrada", HttpStatus.CREATED);
  }

  // Por ahora requiere que se envie el titulo, la imagen, etc. Probablemente deba hacer que solo se verifiquen si no son null, en cuyo caso se deja el dato como esta en la BD
  @PutMapping("/update")
  public ResponseEntity<?> updatePublicacion(@RequestBody PublicacionDTO publicacionDTO) {
    // Test ID incluido en paquete
    if (publicacionDTO.getId() == null) {
      return new ResponseEntity<>("Se requiere el ID", HttpStatus.BAD_REQUEST);
    }

    // Test publicacion existe en BD
    Publicacion publicacion;
    try {
      publicacion = publicacionRepository.findById(publicacionDTO.getId()).get();
    }
    catch (Exception e) {
      return new ResponseEntity<>("La publicacion no existe", HttpStatus.BAD_REQUEST);
    }
    // Test publicacion esta activa (Esto deberia ser manejado por los states)
    if (!publicacion.isActivo()) return new ResponseEntity<>("La publicacion no puede modificarse", HttpStatus.BAD_REQUEST);

    // Update
    publicacion = publicacionMapper.updatePublicacion(publicacion, publicacionDTO);

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
		return ResponseEntity.ok(publicacionMapper.toPublicacionDTO(oPublicacion.get()));
	}	

  // Esto no deberia tener uso, y creo que ya no funciona con el formato actual de las imagenes. Queda por las dudas
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
    public @ResponseBody Iterable<PublicacionDTO> buscarPublicacionPorUserId(@PathVariable Long userID) {
        System.out.println("----- Fetching Publicaciones de id = " + userID + " ------");
        return publicacionRepository.findAllByUserID(userID).stream()
        .map(publicacionMapper::toPublicacionDTO)
        .collect(Collectors.toList());
    }
  @GetMapping("/user/{userID}/activas")
    public @ResponseBody Iterable<PublicacionDTO> buscarActivasPorUserId(@PathVariable Long userID) {
        System.out.println("----- Fetching Publicaciones Activas de id = " + userID + " ------");
        return publicacionRepository.findByUserIdAndStates(userID, "Disponible", "Reservado").stream()
        .map(publicacionMapper::toPublicacionDTO)
        .collect(Collectors.toList());
    }
  @GetMapping("/user/{userID}/finalizadas")
    public @ResponseBody Iterable<PublicacionDTO> buscarFinalizadasPorUserId(@PathVariable Long userID) {
        System.out.println("----- Fetching Publicaciones Finalizadas de id = " + userID + " ------");
        return publicacionRepository.findByUserIdAndState(userID, "Finalizado").stream()
          .map(publicacionMapper::toPublicacionDTO)
          .collect(Collectors.toList());
    }
    

  @GetMapping(path="/all")
  public @ResponseBody Iterable<PublicacionDTO> getAllPublicaciones() {
    System.out.println("----- Fetching Publicaciones ------");
    return publicacionRepository.findAll().stream()
      .map(publicacionMapper::toPublicacionDTO)
      .collect(Collectors.toList());
  }

  @GetMapping(path="/all/activas")
  public @ResponseBody Iterable<PublicacionDTO> getAllPublicacionesActivas() {
    System.out.println("----- Fetching Publicaciones Activas ------");
    return publicacionRepository.findByStates("Disponible", "Reservado").stream()
    .map(publicacionMapper::toPublicacionDTO)
    .collect(Collectors.toList());
  }

  @GetMapping(path="/all/finalizadas")
  public @ResponseBody Iterable<PublicacionDTO> getAllPublicacionesFinalizadas() {
    System.out.println("----- Fetching Publicaciones Finalizadas ------");
    return publicacionRepository.findByState("Finalizado").stream()
    .map(publicacionMapper::toPublicacionDTO)
    .collect(Collectors.toList());
  }
}
