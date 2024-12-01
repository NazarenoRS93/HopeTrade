package is2.g57.hopetrade.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.entity.Publicacion;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.dto.IntercambioDTO;
import is2.g57.hopetrade.mapper.IntercambioMapper;
import is2.g57.hopetrade.repository.FilialRepository;
import is2.g57.hopetrade.repository.IntercambioRepository;
import is2.g57.hopetrade.repository.OfertaRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.repository.UserRepository;
import is2.g57.hopetrade.services.MailService;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping(path="/intercambio")
public class IntercambioController {
    @Autowired
	private IntercambioRepository intercambioRepository;
    @Autowired
    private IntercambioMapper intercambioMapper;
    @Autowired
    private OfertaRepository ofertaRepository;
    @Autowired
    private FilialRepository filialRepository;
	@Autowired
    private MailService emailService;
    @Autowired
    private PublicacionRepository publicacionRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping(path="/all")
    public List<IntercambioDTO> getAll() {
        List<Intercambio> intercambios = intercambioRepository.findAll();
        return intercambios.stream().map(intercambioMapper::map).collect(Collectors.toList());
    }

    @GetMapping(path="/user/{userId}")
    public List<IntercambioDTO> getByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).get();
        List<Intercambio> intercambios = intercambioRepository.findAllByUser(user);
        return intercambios.stream().map(intercambioMapper::map).collect(Collectors.toList());
    }

    @GetMapping("/filial/{filialId}")
    public List<IntercambioDTO> getByFilial(@PathVariable Long filialId) {
        Filial filial = filialRepository.findById(filialId).get();
        List<Intercambio> intercambios = intercambioRepository.findAllByFilial(filial);
        return intercambios.stream().map(intercambioMapper::map).collect(Collectors.toList());
    }
    
    @GetMapping(path="/{id}")
    public IntercambioDTO getById(@PathVariable Long id) {
        Intercambio intercambio = intercambioRepository.findById(id).get();
        return intercambioMapper.map(intercambio);
    }

    @GetMapping("/publicacion/{publicacionId}")
    public IntercambioDTO getByPublicacion(@PathVariable Long publicacionId) {
        Optional<Intercambio> intercambio = intercambioRepository.findByPublicacionId(publicacionId);
        return intercambioMapper.map(intercambio.get());
    }

    @PutMapping("confirmar/{id}")
    public ResponseEntity<?> confirmarIntercambio(@PathVariable String id) {
        System.out.println("CONFIRMANDO INTERCAMBIO " + id);

        Intercambio intercambio = intercambioRepository.findById(Long.parseLong(id)).get();
        intercambio.confirmar();

        System.out.println("ARCHIVANDO OFERTA");
        intercambio.getOferta().archivar();

        System.out.println("FINALIZANDO PUBLICACION");
        intercambio.getPublicacion().finalizar();

        // Eliminar ofertas de publicacion excepto la oferta del intercambio
        System.out.println("LIMPIANDO OFERTAS RESTANTES");

        if (ofertaRepository.countByPublicacionIdAndEstado(intercambio.getPublicacion().getId(), "ACTIVA") > 0) {
            List<Oferta> ofertas = ofertaRepository.findAllByPublicacionIdAndEstado(intercambio.getPublicacion().getId(), "ACTIVA");
            // Eliminar ofertas no protegidas (las canceladas y la asociada al intercambio confirmado; se necesitan para el puntaje y el historial)
            System.out.println("NOTIFICANDO OFERTANTES RESTANTES");
            emailService.sendEmailIntercambioRealizado(ofertas);
            // Eliminar ofertas irrelevantes
            ofertaRepository.deleteAll(ofertas);
        }
        
        intercambioRepository.save(intercambio);
        emailService.sendEmailIntercambioRealizado(intercambio);
        return new ResponseEntity<>("Intercambio confirmado.", HttpStatus.OK);

    }

    @PutMapping("cancelar/{id}")
    public ResponseEntity<?> cancelarIntercambio(@PathVariable String id, @RequestParam String respuesta) {

        System.out.println("CANCELANDO INTERCAMBIO " + id);
        System.out.println("RESPUESTA: " + respuesta);

        Intercambio intercambio = intercambioRepository.findById(Long.parseLong(id)).get();
        Publicacion publicacion = intercambio.getPublicacion();
        Oferta oferta = intercambio.getOferta();

        oferta.archivar();
        ofertaRepository.save(oferta);

        Publicacion newPub = publicacion.clonar();
        publicacion.publicar();
        publicacionRepository.save(newPub);

        intercambio.cancelar();
        intercambio.setPublicacion(newPub);
        intercambioRepository.save(intercambio);

        emailService.sendEmailIntercambioCancelado(intercambio, respuesta);

        return new ResponseEntity<>("Intercambio cancelado.", HttpStatus.OK);
    }



    // @GetMapping(path="/all/reservadas")
    // @GetMapping(path="/all/canceladas")
    // @GetMapping(path="/all/finalizadas")
}
