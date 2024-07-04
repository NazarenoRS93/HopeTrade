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

import is2.g57.hopetrade.entity.DonacionEnFilial;
import is2.g57.hopetrade.repository.AyudanteRepository;
import is2.g57.hopetrade.repository.DonacionEnFilialRepository;
import is2.g57.hopetrade.repository.FilialRepository;

@Component
@Order(10)
public class DonacionEnFilialLoader implements ApplicationRunner {
	@Autowired
	private DonacionEnFilialRepository donacionRepository;

	@Autowired
	private FilialRepository filialRepository;

	@Autowired
	private AyudanteRepository ayudanteRepository;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		// TODO Auto-generated method stub
		List<String[]> donaciones = Arrays.asList(
				// Dni - Nombre - Filial - Ayudante - Categoria - Descripcion - Cantidad - // EsDinero
				 new String[] { "44785886", "Lautaro Jaime", "1", "3", "16", "Efectivo", "15000", "true" },
		            new String[] { "35270021", "Federico Medina", "2", "2", "16", "Efectivo", "2000", "true" },
		            new String[] { "33322211", "Juan Perez", "1", "4", "1", "Microondas", "1", "false" },
		            new String[] { "44455566", "Maria Lopez", "2", "3", "2", "Lavadora", "1", "false" },
		            new String[] { "55566677", "Carlos Gonzalez", "3", "5", "3", "Mesa", "1", "false" },
		            new String[] { "66677788", "Ana Martinez", "4", "2", "4", "Juego de cubiertos", "1", "false" },
		            new String[] { "77788899", "Luis Ramirez", "5", "4", "5", "Campera", "2", "false" },
		            new String[] { "88899900", "Sofia Fernandez", "1", "5", "6", "Arroz 1kg", "5", "false" },
		            new String[] { "99900011", "Miguel Torres", "2", "2", "7", "Detergente", "3", "false" },
		            new String[] { "11122233", "Isabella Diaz", "3", "3", "8", "Muñeca", "1", "false" },
		            new String[] { "22233344", "Mateo Silva", "4", "4", "9", "Cuadernos", "10", "false" },
		            new String[] { "33344455", "Victoria Rojas", "5", "5", "10", "Novela", "4", "false" },
		            new String[] { "44455566", "Gabriel Ruiz", "1", "2", "11", "Collar para perro", "1", "false" },
		            new String[] { "55566677", "Valentina Castro", "2", "3", "12", "Martillo", "2", "false" },
		            new String[] { "66677788", "Emilia Morales", "3", "4", "13", "Shampoo 200ml", "3", "false" },
		            new String[] { "77788899", "Sebastian Soto", "4", "5", "14", "Guantes quirúrgicos", "50", "false" },
		            new String[] { "88899900", "Camila Vega", "5", "2", "15", "Cemento 50kg", "10", "false" },
		            new String[] { "99900011", "Lucia Benitez", "1", "3", "16", "Efectivo", "5000", "true" },
		            new String[] { "11122233", "Martina Acosta", "2", "4", "16", "Efectivo", "3000", "true" } );

		System.out.println("---------- Intentando cargar Donaciones en filial ----------");
		if (donacionRepository.count() == 0) {
			for (String[] don: donaciones) {
				 
				DonacionEnFilial donacion = new DonacionEnFilial(
	                    don[0], 
	                    don[1], 
	                    Long.parseLong(don[2]), 
	                    Long.parseLong(don[3]), 
	                    Long.parseLong(don[4]), 
	                    don[5], 
	                    Integer.parseInt(don[6]), 
	                    Boolean.parseBoolean(don[7])
	                );
			    Random random = new Random();
			    int mes = random.nextInt(5) + 1;
			    int dia = random.nextInt(27) + 1;
			    int hora = random.nextInt(12) + 8;
			    int minuto = random.nextInt(59) + 1;
				donacion.setFecha_hora(LocalDateTime.of(2024, mes, dia, hora, minuto));
	                donacionRepository.save(donacion);
			}
		}
	}
}
