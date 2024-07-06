package is2.g57.hopetrade.runner;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.controller.OfertaController;
import is2.g57.hopetrade.controller.PublicacionController;
import is2.g57.hopetrade.dto.*;
import is2.g57.hopetrade.entity.*;
import is2.g57.hopetrade.repository.*;
import is2.g57.hopetrade.mapper.*;
import is2.g57.hopetrade.services.ImageService;
import jakarta.transaction.Transactional;

//Oferta ID 5 -- Publicacion -- ID 6
@Component
@Order(12)
public class IntercambioDataLoader implements ApplicationRunner {

	@Autowired
	PublicacionController publicacionController;

	@Autowired
	OfertaController ofertaController;

	@Autowired
	private OfertaRepository ofertaRepository;

	@Autowired
	private PublicacionRepository publicacionRepository;

	@Autowired
	private IntercambioRepository intercambioRepository;

	@Autowired
	private ImageService imageService;

	@Autowired
	private OfertaMapper ofertaMapper;

	@Autowired
	private PublicacionMapper publicacionMapper;

	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional
	public void run(ApplicationArguments args) throws Exception {
	    System.out.println("Empezando a cargar intercambio");
	    try {
	        Long ofertaId = (long) 5;
	        Optional<Oferta> ofertaOp = ofertaRepository.findById(ofertaId);

	        if (ofertaOp.isPresent()) {
	            Oferta oferta = ofertaOp.get();

	            // Assuming aceptarOferta method should update oferta
	            ofertaController.aceptarOferta2(oferta.getId());
	            System.out.println("Oferta aceptada correctamente");
	        } else {
	            System.out.println("Oferta no encontrada");
	        }

	    } catch (Exception e) {
	        throw new Exception("Error en intercambio: ", e);
	    }
	}
}

