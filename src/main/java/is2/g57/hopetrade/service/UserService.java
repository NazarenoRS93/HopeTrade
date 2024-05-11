package is2.g57.hopetrade.service;

import java.util.Optional;

import is2.g57.hopetrade.entity.User;

public interface UserService {

    public Optional<User> findUserByEmail(String email);

    public Optional<User> findUserByDni(String dni);
    
    public Optional<User> findById(Long id);
    
    public User saveUser(User user);
    
    public void deleteById(Long id);
}
