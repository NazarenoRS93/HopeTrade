package is2.g57.hopetrade.service;

import java.sql.Date;
import java.util.Optional;

import is2.g57.hopetrade.entity.RelAyudanteFilial;




//Clase agregada por si acaso, puede ser innecesaria , No esta finalizada la implementacion 

public interface RelAyudanteFilialService {
	
	
	public void save(RelAyudanteFilial relAyudanteFilial);
	public Optional<RelAyudanteFilial>findByIdAyudante(Long id);
	public Optional<RelAyudanteFilial>findByIdFilial (Long id);
	public Optional<RelAyudanteFilial>findByFecha(Date fecha);
}
