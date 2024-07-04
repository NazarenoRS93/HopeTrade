package is2.g57.hopetrade.runner;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.repository.FilialRepository;

@Component
@Order(1)
public class FilialDataLoader implements ApplicationRunner {
    @Autowired 
    private FilialRepository filialRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<String[]> filiales = Arrays.asList(
            new String[]{"Caritas Esperanza", "6 y 55", "email1@caritas.com"},
            new String[]{"Caritas Las Quintas", "12 y 43", "email2@caritas.com"},
            new String[]{"Caritas LP", "116 y 66", "email3@caritas.com"},
            new String[]{"Caritas Solidaridad", "25 y 47", "email4@caritas.com"},
            new String[]{"Caritas Tolosa", "4 y 526", "email6@caritas.com"}
        );
        
        System.out.println("---------     Intentando cargar filiales       --------");
        if  (filialRepository.count() == 0) {
            for (String[] f: filiales) {
                String nombre = f[0];
                String direccion = f[1];
                String mail = f[2];
                System.out.println("Cargando filial: " + nombre);
                filialRepository.save(new Filial(nombre, direccion, mail));
            }
        }
        else {
            System.out.println("Filiales ya existen");
        }
    }
}
