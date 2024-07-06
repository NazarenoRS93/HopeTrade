package is2.g57.hopetrade.runner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.dto.OfertaDTO;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.mapper.OfertaMapper;
import is2.g57.hopetrade.repository.OfertaRepository;
import is2.g57.hopetrade.services.ImageService;

@Component
@Order(9)
public class OfertaDataLoader implements ApplicationRunner {

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private OfertaMapper ofertaMapper;


    @Override
    public void run(ApplicationArguments args) throws Exception {

        List<String[]> ofertas = Arrays.asList(
            new String[]{"4", "Manzana", "Una manzana fresca y jugosa, llena de vitaminas y perfecta como merienda saludable.", "1", "1", "ACEPTADA", "manzana.jpg"},
            new String[]{"4", "Lavarropas", "Un lavarropas eficiente que facilita la limpieza de tu ropa con tecnología moderna.", "6", "2", "ACEPTADA", "lavarropas.jpg"},
            new String[]{"4", "Fideos", "Paquete de fideos tallarines", "1", "1", "ACEPTADA", "tallirin.jpg"},
            new String[]{"4", "Arroz", "Paquete de arroz de 1kg", "1", "3", "ACEPTADA", "biju.jpg"}
        );

		if (ofertaRepository.count() == 0) {
			System.out.println("Cargando ofertas de ejemplo...");
			int cant = 0;
			for (String[] o : ofertas) {
				cant++;
				OfertaDTO dto = new OfertaDTO();
				dto.setUserId(Long.parseLong(o[0]));
				dto.setTitulo(o[1]);
				dto.setDescripcion(o[2]);
				dto.setPublicacionId(Long.parseLong(o[3]));
				dto.setFilialId(Long.parseLong(o[4]));
				dto.setEstado(o[5]);
				dto.setImagen(imageService.loadSampleBase64(o[6]));
				dto.setFechaCreacion(LocalDateTime.now());
				int dia = LocalDateTime.now().getDayOfMonth();
				if (cant == 2) {
					dia = 5;
				}
				Random random = new Random();
				int hora = random.nextInt(4) + 16;
				dto.setFechaIntercambio(LocalDateTime.of(2024, 7, dia, hora, 30));
				Oferta oferta = ofertaMapper.map(dto);
				ofertaRepository.save(oferta);
			}
		}
	}
}
