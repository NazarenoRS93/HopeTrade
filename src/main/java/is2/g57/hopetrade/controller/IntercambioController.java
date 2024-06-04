package is2.g57.hopetrade.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.dto.IntercambioDTO;
import is2.g57.hopetrade.mapper.IntercambioMapper;
import is2.g57.hopetrade.repository.IntercambioRepository;
import is2.g57.hopetrade.repository.PublicacionRepository;

import org.springframework.core.io.Resource;

@RestController
@RequestMapping(path="/intercambio")
public class IntercambioController {
    @Autowired
	private IntercambioRepository intercambioRepository;
    @Autowired
    private IntercambioMapper intercambioMapper;

    @GetMapping(path="/all")
    public List<IntercambioDTO> getAll() {
        List<Intercambio> intercambios = intercambioRepository.findAll();
        return intercambios.stream().map(intercambioMapper::map).collect(Collectors.toList());
    }
    
    @GetMapping(path="/{id}")
    public IntercambioDTO getById(@PathVariable Long id) {
        Intercambio intercambio = intercambioRepository.findById(id).get();
        return intercambioMapper.map(intercambio);
    }



    // @GetMapping(path="/all/reservadas")
    // @GetMapping(path="/all/canceladas")
    // @GetMapping(path="/all/finalizadas")
}
