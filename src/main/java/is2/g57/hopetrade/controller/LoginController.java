package is2.g57.hopetrade.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.AyudanteRepository;
import is2.g57.hopetrade.repository.UserRepository;

@RestController
@RequestMapping("/login")

public class LoginController {
	@Autowired
	private AyudanteRepository ayudanteRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/login-administrativo")
    public ResponseEntity<?> loginAyudante(@RequestParam("email") String email, @RequestParam("dni") String pass) {

        Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByEmail(email);

        if (!ayudanteOp.isPresent()) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Email no registrado", null, null, null), HttpStatus.UNAUTHORIZED);
        }

        Ayudante ayudante = ayudanteOp.get();

        if (!ayudante.getPass().equals(pass)) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Email y contraseña no coinciden", null, null, null), HttpStatus.UNAUTHORIZED);
        }

        if (!ayudante.isActivo()) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Cuenta suspendida", null, null, null), HttpStatus.UNAUTHORIZED);
        }
        
        if(ayudante.isAdmin()) {
        	LoginResponse response = new LoginResponse(ayudante.getDni(), ayudante.getId(), ayudante.isActivo(),"Inicio de sesion como Representante." , ayudante.getNombre(), ayudante.getApellido(), 2);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else {
        	LoginResponse response = new LoginResponse(ayudante.getDni(), ayudante.getId(), ayudante.isActivo(), "Inicio de sesion como Ayudante.", ayudante.getNombre(), ayudante.getApellido(), 1);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
	
	
	@GetMapping("/login-user/{dni}/{pass}")
    public ResponseEntity<?> loginUser(@RequestParam("dni") String dni, @RequestParam("dni") String pass) {

        Optional<User> userOp = userRepository.findUserByDni(dni);
        
        if (!userOp.isPresent()) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Dni no registrado", null, null, null), HttpStatus.UNAUTHORIZED);
        } 
        User user  = userOp.get();
        if(!user.getPass().equals(pass)) {
        	return new ResponseEntity<>(new LoginResponse(null, null, null, "El dni o la contraseña no coinciden ", null, null, null), HttpStatus.UNAUTHORIZED);
        }
        if (!user.isActivo()) {
            return new ResponseEntity<>(new LoginResponse(null, null, null, "Cuenta suspendida", null, null, null), HttpStatus.UNAUTHORIZED);
        }
        else {
        	LoginResponse response = new LoginResponse(user.getDni(), user.getId(),user.isActivo(), "Inicio de sesion exitoso!!.", user.getNombre(), user.getApellido(),null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
