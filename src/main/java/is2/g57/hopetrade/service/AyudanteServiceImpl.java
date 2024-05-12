package is2.g57.hopetrade.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.AyudanteRepository;

@Service
public class AyudanteServiceImpl implements AyudanteService{
	
	@Autowired
	private AyudanteRepository ayudanteRepository;
	
	@Override
	@Transactional(readOnly = true)
	public Optional<Ayudante> findAyudanteByEmail(String email) {
		return ayudanteRepository.findAyudanteByMail(email);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Ayudante> findAyudanteByDni(String dni) {
		return ayudanteRepository.findAyudanteByDni(dni);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Ayudante> findById(Long id) {
		return ayudanteRepository.findById(id);
	}

	@Override
	@Transactional
	public Ayudante saveUser(Ayudante ayudante) {
		return ayudanteRepository.save(ayudante);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		ayudanteRepository.deleteById(id);
	}

}
