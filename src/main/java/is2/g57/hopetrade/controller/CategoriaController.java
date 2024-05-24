package is2.g57.hopetrade.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import is2.g57.hopetrade.entity.Categoria;
import is2.g57.hopetrade.repository.CategoriaRepository;


/*  Controlador de categorias

    Interfaz:
    GET All: http://localhost:8080/publicacion/all
    GET por ID: http://localhost:8080/publicacion/{id}
 */
@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/all")
    public ResponseEntity<?> ObtenerCategorias() {
        List<Categoria> categorias = this.categoriaRepository.findAll();
        return new ResponseEntity<>(categorias, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ObtenerCategoriaPorId(@PathVariable Long id) {
        Optional<Categoria> categoriaOp = this.categoriaRepository.findById(id);
        if (categoriaOp.isPresent()) {
            return new ResponseEntity<>(categoriaOp.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontro la categoria", HttpStatus.NOT_FOUND);
        }
    }
    
}
