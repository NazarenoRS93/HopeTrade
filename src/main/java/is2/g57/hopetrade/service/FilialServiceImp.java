package is2.g57.hopetrade.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.repository.FilialRepository;



@Service
public class FilialServiceImp implements FilialService{
 private FilialRepository filialRepository;
	@Override
	public void save(Filial filial) {
		this.filialRepository.save(filial);
	}

	@Override
	public Optional<Filial> findById(Long id) {
		// TODO Auto-generated method stub
		return this.findById(id);
	}

	@Override
	public Optional<Filial> findByDireccion(String direccion) {
		// TODO Auto-generated method stub
		return this.findByDireccion(direccion);
	}


}
