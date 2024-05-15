package is2.g57.hopetrade.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.repository.AyudanteRepository;



@Service
public class AyudanteServiceImp implements AyudanteService{
 private AyudanteRepository ayudanteRepository;
	@Override
	public void save(Ayudante ayudante) {
			this.ayudanteRepository.save(ayudante);
	}

	@Override
	public Optional<Ayudante> findById(Long id) {
		// TODO Auto-generated method stub
		return this.ayudanteRepository.findById(id);
	}

	@Override
	public Optional<Ayudante> findByMail(String mail) {
		// TODO Auto-generated method stub
		return this.ayudanteRepository.findAyudanteByEmail(mail);
	}

}
