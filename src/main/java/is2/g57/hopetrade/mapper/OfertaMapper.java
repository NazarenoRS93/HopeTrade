package is2.g57.hopetrade.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.dto.OfertaDTO;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.repository.OfertaRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.repository.FilialRepository;
import is2.g57.hopetrade.repository.UserRepository;
import is2.g57.hopetrade.services.ImageService;


@Component
public class OfertaMapper {

    @Autowired  
    private OfertaRepository ofertaRepository;
    @Autowired
    private PublicacionRepository publicacionRepository;
    @Autowired
    private FilialRepository filialRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ImageService imageService;

    public OfertaDTO map(Oferta oferta) {
        OfertaDTO dto = new OfertaDTO();
        dto.setId(oferta.getId());
        dto.setTexto(oferta.getTexto());
        dto.setPublicacionId(oferta.getPublicacion().getId());
        dto.setFilialId(oferta.getFilial().getId());
        dto.setUserId(oferta.getUser().getId());
        dto.setFechaIntercambio(oferta.getFechaIntercambio());
        dto.setFechaCreacion(oferta.getFechaCreacion());
        dto.setRespuesta(oferta.getRespuesta());
        dto.setEstado(oferta.isEstado());
        // Convert URL to Base 64 image
        // dto.setImagen(imageService.loadBase64(oferta.getImagenUrl()));
        return dto;
    }

    public Oferta map(OfertaDTO dto) {
        Oferta oferta = new Oferta();
        oferta.setTexto(dto.getTexto());
        oferta.setFechaIntercambio(dto.getFechaIntercambio());
        oferta.setPublicacion(publicacionRepository.findById(dto.getPublicacionId()).get());
        oferta.setFilial(filialRepository.findById(dto.getFilialId()).get());
        oferta.setUser(userRepository.findById(dto.getUserId()).get());
        // Convert Base 64 image to URL
        // oferta.setImagenUrl(imageService.saveUnique(dto.getImagen()));
        return oferta;
    }
}
