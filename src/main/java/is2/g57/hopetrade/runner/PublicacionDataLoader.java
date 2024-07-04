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
        		new String[]{"3", "Lata de Atún", "Una lata de atún de alta calidad, perfecta para tus recetas favoritas de cocina.", "6", "atun.jpg"},
        		new String[]{"4", "Colchón", "Un colchón cómodo y duradero para un descanso óptimo durante la noche.", "4", "colchon.jpg"},
        		new String[]{"3", "Mochila", "Una mochila espaciosa y resistente, ideal para llevar tus pertenencias con comodidad.", "9", "mochila.jpg"},
        		new String[]{"1", "Manzana", "Una manzana fresca y jugosa, llena de vitaminas y perfecta como merienda saludable.", "6", "manzana.jpg"},
        		new String[]{"4", "Lavarropas", "Un lavarropas eficiente que facilita la limpieza de tu ropa con tecnología moderna.", "2", "lavarropas.jpg"}
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
