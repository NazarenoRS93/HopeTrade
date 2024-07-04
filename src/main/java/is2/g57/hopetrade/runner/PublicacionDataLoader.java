package is2.g57.hopetrade.runner;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import java.util.Base64;

import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.mapper.PublicacionMapper;
import is2.g57.hopetrade.dto.PublicacionDTO;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.services.ImageService;


@Component
@Order(5)
public class PublicacionDataLoader implements ApplicationRunner{

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private PublicacionMapper publicacionMapper;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        List<String[]> publicaciones = Arrays.asList(
            new String[]{"1", "Lata de Atún", "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.", "6", "atun.jpg"},
            new String[]{"1", "Colchón", "Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,", "4", "colchon.jpg"},
            new String[]{"1", "Mochila", "cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.", "9", "mochila.jpg"},
            new String[]{"1", "Manzana", "No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.", "6", "manzana.jpg"},
            new String[]{"1", "Lavarropas", "Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum", "2", "lavarropas.jpg"}
        );
        if (publicacionRepository.count() == 0) {
            System.out.println("Cargando publicaciones de ejemplo...");
            for (String[] p: publicaciones) {
                PublicacionDTO dto = new PublicacionDTO();
                dto.setUserID(Long.parseLong(p[0]));
                dto.setTitulo(p[1]);
                dto.setDescripcion(p[2]);
                dto.setCategoria_ID( Long.parseLong(p[3]));
                dto.setImagen(imageService.loadSampleBase64(p[4]));
                publicacionRepository.save(publicacionMapper.toNewPublicacion(dto));
            }
        }
    
    }
}
