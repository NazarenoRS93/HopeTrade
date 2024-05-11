package is2.g57.hopetrade.service;

import java.util.Optional;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.entity.User;

public interface AyudanteService {
	
	public Optional<Ayudante> findAyudanteByEmail(String email);

    public Optional<Ayudante> findAyudanteByDni(String dni);
    
    public Optional<Ayudante> findById(Long id);
    
    public Ayudante saveUser(Ayudante ayudante);
    
    public void deleteById(Long id);
}
