package is2.g57.hopetrade.runner;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;


import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.repository.AyudanteRepository;

import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.UserRepository;


@Component
@Order(4)
public class UserDataLoader implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AyudanteRepository ayudanteRepository;

    public static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<String[]> ayudantes = Arrays.asList(
            new String[]{"ayudante1@caritas.com", "99999998", "12345", "ayudante1", "ayudante1"},
            new String[]{"ayudante2@caritas.com", "99999997", "12345", "ayudante2", "ayudante2"},
            new String[]{"lautyjaime09@gmail.com", "44785886", "1234", "Lautaro", "Jaime"}
        );

        List<String[]> usuarios = Arrays.asList( 
            new String[]{"usuario1@caritas.com", "99999996", "12345", "Armando", "Testi", "1999-05-10"},
            new String[]{"usuario2@caritas.com", "99999995", "12345", "Jose", "Baneado", "1995-02-02"},
            new String[]{"lautyjaime09@gmail.com", "44785886", "1234", "Lautaro", "Jaime", "2003-04-04"},
            new String[]{"facu.rojasberna@gmail.com ", "35797596", "1234", "Facundo", "Rojas", "1990-07-12"},
            new String[]{"matilozano96@hotmail.com", "19011452", "12345", "Matias", "Lozano", "1996-02-02"}
        );


        System.out.println("-------   Intentando cargar usuarios a BD   -------");
        if  (userRepository.count() == 0) {
            for (String[] f: usuarios) {
                String email = f[0];
                String dni = f[1];
                String pass = f[2];
                String nombre = f[3];
                String apellido = f[4];
                Date fecha = Date.from(LocalDate.parse(f[5], dtf).atStartOfDay(ZoneId.systemDefault()).toInstant());

                userRepository.save(new User(email, dni, pass, nombre, apellido, fecha));
            }
            // Desactivar usuario 2
            User u = userRepository.findUserByEmail("usuario2@caritas.com").get();
            u.setActivo(false);
            userRepository.save(u);
        }

        // Check admin existe
        System.out.println("-------   Cargando admin a BD   -------");
        if (ayudanteRepository.findAyudanteByEmail("admin@caritas.com").isEmpty()) {
            System.out.println("Cargando admin");
            ayudanteRepository.save(new Ayudante("admin@caritas.com", "99999999", "admin", "admin", "admin"));
        }

        System.out.println("-------   Intentando cargar ayudantes a BD   -------");
        if  (ayudanteRepository.count() == 1) {
            System.out.println("Cargando ayudantes");
            for (String[] f: ayudantes) {
                String email = f[0];
                String dni = f[1];
                String pass = f[2];
                String nombre = f[3];
                String apellido = f[4];
                ayudanteRepository.save(new Ayudante(email, dni, pass, nombre, apellido));
            }
            // Desactivar ayudante 2
            Ayudante a = ayudanteRepository.findAyudanteByEmail("ayudante2@caritas.com").get();
            a.setActivo(false);
            ayudanteRepository.save(a);
        }
    }
    
}
