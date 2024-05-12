package is2.g57.hopetrade.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.service.AyudanteService;

@RestController
@RequestMapping("/ayudantes")
public class AyudanteController {

    @Autowired
    private AyudanteService ayudanteService;

    @PostMapping("/crear")
    public ResponseEntity<Ayudante> crearAyudante(@RequestBody Ayudante ayudante) {
        Ayudante nuevoAyudante = ayudanteService.saveUser(ayudante);
        return new ResponseEntity<>(nuevoAyudante, HttpStatus.CREATED);
    }

    @GetMapping("/buscar/{email}")
    public ResponseEntity<Ayudante> buscarAyudantePorEmail(@PathVariable String email) {
        Optional<Ayudante> ayudante = ayudanteService.findAyudanteByEmail(email);
        return ayudante.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/buscar-por-dni/{dni}")
    public ResponseEntity<Ayudante> buscarAyudantePorDni(@PathVariable String dni) {
        Optional<Ayudante> ayudante = ayudanteService.findAyudanteByDni(dni);
        return ayudante.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/buscar-por-id/{id}")
    public ResponseEntity<Ayudante> buscarAyudantePorId(@PathVariable Long id) {
        Optional<Ayudante> ayudante = ayudanteService.findById(id);
        return ayudante.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarAyudantePorId(@PathVariable Long id) {
        ayudanteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
