package is2.g57.hopetrade.service;

import java.util.Optional;

import is2.g57.hopetrade.entity.User;






public interface  UserService {

	public void save(User user);
	public Optional<User>findById(Long id);
	public Optional<User>findByDni(String dni);
	public Optional<User>findByMail(String mail);
	public void update(Long id,String email, String nombre, String apellido);
	public void updatePass(Long id,String pass, String newPass);
}
