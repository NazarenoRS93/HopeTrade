package is2.g57.hopetrade.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.UserRepository;



@Service
public class UserServiceImp implements UserService {
	private UserRepository userRepository;

	@Override
	public void save(User user) {
		userRepository.save(user);
	}

	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public Optional<User> findByDni(String dni) {
		return userRepository.findByDni(dni);
	}

	@Override
	public Optional<User> findByMail(String mail) {
		return userRepository.findByMail(mail);
	}

	@Override
	public void update(Long id, String email, String nombre, String apellido) {
		Optional<User> userOp = userRepository.findById(id);
		if (userOp.isPresent()) {
			User user = userOp.get();
			if (email != null) {
				if (this.findByMail(email).isPresent()) {
					throw new IllegalArgumentException();
				} else {
					user.setEmail(email);
				}
			}

			if (apellido != null) {
				user.setApellido(apellido);
			}
			if (nombre != null) {
				user.setNombre(nombre);
			}
		userRepository.save(user);
		}

	}

	@Override
	public void updatePass(Long id, String pass, String newPass) {
		Optional<User> userOp = userRepository.findById(id);
		if (userOp.isPresent()) {
			User user = userOp.get();
			if (user.getPass().equals(pass)) {
				if (user.getPass().equals(newPass)) {
					throw new IllegalArgumentException("Debes ingresar una contraseña diferente a la actual");
				} else { user.setPass(newPass);
			}
		}

	}

}
}
