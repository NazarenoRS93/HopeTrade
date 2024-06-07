package is2.g57.hopetrade.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.dto.OfertaDTO;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.repository.OfertaRepository;

@Component
public class OfertaMapper {
    public OfertaDTO map(Oferta oferta) {
        OfertaDTO dto = new OfertaDTO();
        // TBD
        return dto;
    }
}
