package is2.g57.hopetrade.mapper;


import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.services.ImageService;
import is2.g57.hopetrade.repository.CategoriaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class PublicacionMapper {

    @Autowired
    private ImageService imageService;
    @Autowired
    private CategoriaRepository categoriaRepository;

    public PublicacionDTO newPublicacionDTO(Long userID, String titulo, String descripcion, String categoria, String image) {
        PublicacionDTO dto = new PublicacionDTO();
        dto.setUserID(userID);
        dto.setTitulo(titulo);
        dto.setDescripcion(descripcion);
        dto.setImagen(imageService.saveUnique(image));
        dto.setCategoria(categoria);
        return dto;
    }

    public PublicacionDTO newPublicacionDTO(Long userID, String titulo, String descripcion, String image) {
        PublicacionDTO dto = new PublicacionDTO();
        dto.setUserID(userID);
        dto.setTitulo(titulo);
        dto.setDescripcion(descripcion);
        dto.setImagen(image);
        return dto;
    }

    public PublicacionDTO toPublicacionDTO(Publicacion publicacion) {
        PublicacionDTO dto = new PublicacionDTO();
        dto.setId(publicacion.getId());
        dto.setTitulo(publicacion.getTitulo());
        dto.setDescripcion(publicacion.getDescripcion());
        dto.setFechaHoraCreacion(publicacion.getFechaHoraCreacion());
        dto.setUltimaModificacion(publicacion.getUltimaModificacion());
        dto.setActive(publicacion.isActivo());
        dto.setUserID(publicacion.getUserID());
        // Convert URL to Base 64 image
        dto.setImagen(imageService.loadBase64(publicacion.getImagenUrl()));
        dto.setCategoria(categoriaRepository.findById(publicacion.getCategoria_id()).get().getNombre());
        return dto;
    }

    public Publicacion toNewPublicacion(PublicacionDTO publicacionDTO) {
        Publicacion p = new Publicacion(publicacionDTO);

        // Convert Base 64 image to URL
        p.setImagenUrl(imageService.saveUnique(publicacionDTO.getImagen()));

        // Temporal, porque el paso de categorias desde el front no esta implementado
        if (publicacionDTO.getCategoria() == null) {
            p.setCategoria_id(1L);
        }
        else {
            p.setCategoria_id(categoriaRepository.findByNombre(publicacionDTO.getCategoria()).get().getId());
        }
        return p;
    }

    public Publicacion updatePublicacion(Publicacion publicacion, PublicacionDTO publicacionDTO) {
        publicacion.update(publicacionDTO);
        // Temporal, porque el paso de categorias desde el front no esta implementado
        if (publicacionDTO.getCategoria() == null) {
            publicacion.setCategoria_id(1L);
        }
        else {
            publicacion.setCategoria_id(categoriaRepository.findByNombre(publicacionDTO.getCategoria()).get().getId());
        }

        if (publicacionDTO.getImagen() != null) {
            imageService.delete(publicacion.getImagenUrl());
            publicacion.setImagenUrl(imageService.saveUnique(publicacionDTO.getImagen()));
        }
        return publicacion;
    }
}