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
import is2.g57.hopetrade.dto.IntercambioDTO;
import is2.g57.hopetrade.mapper.IntercambioMapper;
import is2.g57.hopetrade.repository.FilialRepository;
import is2.g57.hopetrade.repository.IntercambioRepository;
import is2.g57.hopetrade.repository.OfertaRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.services.MailService;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



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

    @GetMapping(path="/all")
    public List<IntercambioDTO> getAll() {
        List<Intercambio> intercambios = intercambioRepository.findAll();
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
        Intercambio intercambio = intercambioRepository.findById(Long.parseLong(id)).get();
        intercambio.confirmar();
        intercambio.getOferta().setEstado(false);
        intercambio.getPublicacion().finalizar();

        // Eliminar ofertas de publicacion excepto la oferta del intercambio
        List<Oferta> ofertas = ofertaRepository.findAllByPublicacionId(intercambio.getPublicacion().getId());
        emailService.sendEmailIntercambioRealizado(ofertas);
        ofertas.remove(intercambio.getOferta());
      
        ofertaRepository.deleteAll(ofertas);
        
        intercambioRepository.save(intercambio);
        return ResponseEntity.ok().build();
    }

    @PutMapping("cancelar/{id}")
    public ResponseEntity<?> cancelarIntercambio(@PathVariable String id) {
        Intercambio intercambio = intercambioRepository.findById(Long.parseLong(id)).get();
        Publicacion publicacion = intercambio.getPublicacion();
        publicacion.publicar();
        publicacionRepository.save(publicacion);

        intercambioRepository.delete(intercambio);
        // intercambio.cancelar();
        // intercambioRepository.save(intercambio);
        
        
        // Nota, esta el caso borde de que pase esto
        // 1 - Se programa un intercambio
        // 2 - Se cancela el intercambio
        // 3 - Se programa un intercambio desde la misma publicacion
        // 4 - Se confirma el intercambio
        // El resultado es que la oferta correspondiente al primer intercambio ( el cancelado ) se elimina, dejandolo sin referencia
        // La solución sería marcar la oferta como protegida de alguna manera, para que no se elimine en procesos como este. O dejar de eliminarlas porque no importa dado el volumen de datos que manejamos.

        return ResponseEntity.ok().build();
    }



    // @GetMapping(path="/all/reservadas")
    // @GetMapping(path="/all/canceladas")
    // @GetMapping(path="/all/finalizadas")
}
