package is2.g57.hopetrade.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.dto.IntercambioDTO;
import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.repository.IntercambioRepository;

@Component
public class IntercambioMapper {

    @Autowired
    private IntercambioRepository intercambioRepository;
    
    public IntercambioDTO map(Intercambio intercambio) {
        IntercambioDTO dto = new IntercambioDTO();
        dto.setId(intercambio.getId());
        dto.setPublicacionID(intercambio.getPublicacionID());
        // dto.setOfertaID(intercambio.getOferta().getId());
        dto.setObservacion(intercambio.getObservacion());
        dto.setEstadoID(1L);
        return dto;
    }
    
}
