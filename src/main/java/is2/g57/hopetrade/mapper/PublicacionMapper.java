package is2.g57.hopetrade.mapper;


import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.entity.Categoria;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.state.PublicacionStateDisponible;
import is2.g57.hopetrade.services.ImageService;
import is2.g57.hopetrade.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PublicacionMapper {

    @Autowired
    private ImageService imageService;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private PublicacionStateRepository publicacionStateRepository;
    @Autowired
    private OfertaRepository ofertaRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ComentarioRepository comentarioRepository;

    public PublicacionDTO map(Publicacion publicacion) {
        PublicacionDTO dto = new PublicacionDTO();
        dto.setId(publicacion.getId());
        dto.setTitulo(publicacion.getTitulo());
        dto.setDescripcion(publicacion.getDescripcion());
        dto.setFechaHoraCreacion(publicacion.getFechaHoraCreacion());
        dto.setUltimaModificacion(publicacion.getUltimaModificacion());
        dto.setActive(publicacion.isActivo());
        dto.setUserID(publicacion.getUser().getId());
        dto.setUserFullName(publicacion.getUser().getFullName());
        // Convert URL to Base 64 image
        dto.setImagen(imageService.loadBase64(publicacion.getImagenUrl()));
        dto.setCategoria_Nombre(publicacion.getCategoria().getNombre());
        dto.setCategoria_ID(publicacion.getCategoria().getId());
        dto.setEstado(publicacion.getState().getNombre());
        dto.setEstadoID(publicacion.getState().getId());
        dto.setOfertas(ofertaRepository.countByPublicacionIdAndEstado(publicacion.getId(), "ACTIVA"));
        dto.setComentarios(comentarioRepository.countByPublicacionId(publicacion.getId()));
        return dto;
    }

    public Publicacion toNewPublicacion(PublicacionDTO publicacionDTO) {
        Publicacion p = new Publicacion(publicacionDTO);
        p.setUser(userRepository.findById(publicacionDTO.getUserID()).get());

        // Convert Base 64 image to URL
        p.setImagenUrl(imageService.saveUnique(publicacionDTO.getImagen()));

        // Temporal, porque el paso de categorias desde el front no esta implementado
        if (publicacionDTO.getCategoria_ID() == null) {
            p.setCategoria(categoriaRepository.findByNombre("Otros").get());
        }
        else {
            p.setCategoria(categoriaRepository.findById(publicacionDTO.getCategoria_ID()).get());
        }
        p.setState(publicacionStateRepository.findById(1L).get());
        return p;
    }

    public Publicacion updatePublicacion(Publicacion publicacion, PublicacionDTO publicacionDTO) {
        publicacion.update(publicacionDTO);
        // Temporal, porque el paso de categorias desde el front no esta implementado
        if (publicacionDTO.getCategoria_ID() != null) {
            publicacion.setCategoria(categoriaRepository.findById(publicacionDTO.getCategoria_ID()).get());
        }

        if (publicacionDTO.getImagen() != null) {
            imageService.delete(publicacion.getImagenUrl());
            publicacion.setImagenUrl(imageService.saveUnique(publicacionDTO.getImagen()));
        }
        if (publicacionDTO.getEstadoID() != null) {
            publicacion.setState(publicacionStateRepository.findById(publicacionDTO.getEstadoID()).get());
        }
        return publicacion;
    }
}