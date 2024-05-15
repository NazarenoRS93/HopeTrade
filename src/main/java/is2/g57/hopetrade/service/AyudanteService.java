package is2.g57.hopetrade.service;

import java.util.Optional;

import is2.g57.hopetrade.entity.Ayudante;



public interface AyudanteService {
	public void save(Ayudante ayudante);
	public Optional<Ayudante>findById(Long id);
	public Optional<Ayudante>findByMail(String mail);
}
