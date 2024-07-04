package is2.g57.hopetrade.runner;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.entity.Categoria;
import is2.g57.hopetrade.repository.CategoriaRepository;

@Component
@Order(2)
public class CategoriaDataLoader implements ApplicationRunner {
    @Autowired 
    private CategoriaRepository categoriaRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<String> categorias = Arrays.asList("Electrodomesticos (chicos)", 
        "Electrodomesticos (grandes)", 
        "Muebles",
        "Artículos para el hogar",
        "Vestimenta", 
        "Alimento", 
        "Productos de limpieza", 
        "Juguetes",
        "Material Escolar",
        "Libros",
        "Mascotas",
        "Herramientas",
        "Higiene Personal",
        "Suministros médicos",
        "Materiales de construcción",
        "Otros");
        
        System.out.println("---------     Intentando cargar categorias       --------");
        if  (categoriaRepository.count() == 0) {
            for (String c: categorias) {
                System.out.println("Cargando categoria: " + c);
                categoriaRepository.save(new Categoria(c));
            }
        }
        else {
            System.out.println("Categorias ya existen");
        }
    }
}
