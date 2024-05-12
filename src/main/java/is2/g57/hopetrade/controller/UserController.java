package is2.g57.hopetrade.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	//Creando nuevo usuario
	
	@PostMapping
	public ResponseEntity<?> create (@RequestBody User user){
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user));
	}
	
	//leer usuario
	@GetMapping("/{id}")
	public ResponseEntity<?> read(@PathVariable(value = "id") Long userId){
		Optional<User> oUser = userService.findById(userId);
		if(!oUser.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(oUser);
	}	
	
	//actualizar usuario
	
	@PutMapping("/{dni}")
	public ResponseEntity<?> update(@RequestBody User userDetails, @PathVariable(value ="dni") String userDni){
	  Optional<User> user = userService.findUserByDni(userDni);
	  if(!user.isPresent()) {
			return ResponseEntity.notFound().build();
	  }
	  user.get().setNombre(userDetails.getNombre());
	  user.get().setApellido(userDetails.getApellido());
	  user.get().setMail(userDetails.getMail());
	  return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user.get()));
	}
}
