package is2.g57.hopetrade.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.dto.IntercambioDTO;
import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.repository.IntercambioRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;

@Component
public class IntercambioMapper {

    @Autowired
    private IntercambioRepository intercambioRepository;

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Autowired
    private PublicacionMapper publicacionMapper;

    @Autowired
    private OfertaMapper ofertaMapper;
    
    public IntercambioDTO map(Intercambio intercambio) {
        IntercambioDTO dto = new IntercambioDTO();
        dto.setId(intercambio.getId());
        dto.setPublicacion(publicacionMapper.map(intercambio.getPublicacion()));
        dto.setOferta(ofertaMapper.map(intercambio.getOferta()));
        dto.setObservacion(intercambio.getObservacion());
        dto.setEstadoID(1L);
        return dto;
    }
    
}
