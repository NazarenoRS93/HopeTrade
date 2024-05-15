package is2.g57.hopetrade.service;

import java.util.Optional;

import is2.g57.hopetrade.entity.Filial;


public interface FilialService {
	public void save(Filial filial);
	public Optional<Filial>findById(Long id);
	public Optional<Filial>findByDireccion(String direccion);
}
