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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login")

public class LoginController {
    @Autowired
    private AyudanteRepository ayudanteRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/login-administrativo/{email}/{pass}")
    public ResponseEntity<?> loginAyudante(@PathVariable String email, @PathVariable String pass) {
        LoginResponse response = new LoginResponse();
        HttpStatus status;
        try {
            Optional<Ayudante> ayudanteOp = this.ayudanteRepository.findAyudanteByEmail(email);
            if (!ayudanteOp.isPresent()) {
                status = HttpStatus.NOT_FOUND;
                response.setResponseMsg("Email no registrado.");
            } else {
                Ayudante ayudante = ayudanteOp.get();
                if (!ayudante.getPass().equals(pass)) {
                    status = HttpStatus.BAD_REQUEST;
                    response.setResponseMsg("Email y contraseña no coinciden.");
                } else if (!ayudante.isActivo()) {
                    status = HttpStatus.BAD_REQUEST;
                    response.setResponseMsg("Cuenta suspendida.");
                } else {
                    Integer tipoUser;
                    String msg;
                    if (ayudante.isAdmin()) {
                        tipoUser = 2;
                        msg = "Inicio de sesión como representante. ¡Bienvenido!";
                    } else {
                        tipoUser = 1;
                        msg = "Inicio de sesión como ayudante. ¡Bienvenido!";
                    }
                    status = HttpStatus.OK;
                    response = new LoginResponse(ayudante.getDni(), ayudante.getId(),
                            ayudante.isActivo(), msg, ayudante.getNombre(),
                            ayudante.getApellido(), tipoUser);
                }
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response.setResponseMsg("Error al querer validar los datos ingresados.");
        }
        return new ResponseEntity<>(response, status);
    }


    @GetMapping("/login-user/{dni}/{pass}")
    public ResponseEntity<?> loginUser(@PathVariable String dni, @PathVariable String pass) {
        LoginResponse response = new LoginResponse();
        HttpStatus status;
       
        try {
               
            Optional<User> userOp = userRepository.findUserByDni(dni);
            if (!userOp.isPresent()) {
                status = HttpStatus.NOT_FOUND;
                response.setResponseMsg("DNI no registrado.");
            } else {
                User user  = userOp.get();
                if (!user.getPass().equals(pass)) {
                    status = HttpStatus.BAD_REQUEST;
                    response.setResponseMsg("DNI y contraseña no coinciden.");
                } else if (!user.isActivo()) {
                    status = HttpStatus.BAD_REQUEST;
                    response.setResponseMsg("Cuenta suspendida.");
                } else {
                    status = HttpStatus.OK;
                    response = new LoginResponse(user.getDni(), user.getId(),
                            user.isActivo(), "¡Bienvenido a HopeTrade!",
                            user.getNombre(), user.getApellido(),0);
                }
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response.setResponseMsg("Error al querer validar los datos ingresados.");
        }
        return new ResponseEntity<>(response, status);
    }
}
