package is2.g57.hopetrade.service;

import java.sql.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

import is2.g57.hopetrade.entity.RelAyudanteFilial;
import is2.g57.hopetrade.repository.RelAyudanteFilialRepository;




//Clase agregada por si acaso, puede ser innecesaria , No esta finalizada la implementacion 


@Service
public class RelAyudanteFilialServiceImp implements RelAyudanteFilialService{
private RelAyudanteFilialRepository relAyudanteFilialRepo;
	@Override
	public void save(RelAyudanteFilial relAyudanteFilial) {
		// TODO Auto-generated method stub
		this.relAyudanteFilialRepo.save(relAyudanteFilial);
	}

	@Override
	public Optional<RelAyudanteFilial> findByIdAyudante(Long id) {
		// TODO Auto-generated method stub
		return this.relAyudanteFilialRepo.findByIdIdAyudante(id);
	}

	@Override
	public Optional<RelAyudanteFilial> findByIdFilial(Long id) {
		// TODO Auto-generated method stub
		return this.relAyudanteFilialRepo.findByIdFilial(id);
	}
	
	@Override
	public Optional<RelAyudanteFilial> findByFecha(Date fecha) {
		// TODO Auto-generated method stub
		return this.relAyudanteFilialRepo.findByFecha(fecha);
	}

}
