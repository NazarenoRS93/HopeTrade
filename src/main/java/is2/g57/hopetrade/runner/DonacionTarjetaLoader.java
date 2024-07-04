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

import is2.g57.hopetrade.entity.DonacionTarjeta;
import is2.g57.hopetrade.repository.DonacionTarjetaRepository;

@Component
@Order(11)
public class DonacionTarjetaLoader implements ApplicationRunner{
	@Autowired
	private DonacionTarjetaRepository donacionTarjeta;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		List<String[]> donaciones = Arrays.asList(
				 //Monto - idUsuario - NumeroTarjeta
			    new String[] { "10000", "3", "1111111111111111" },
			    new String[] { "3000", "4", "1111111111111110" },
			    new String[] { "8000", "1", "1111111111111112" },
			    new String[] { "2500", "2", "1111111111111113" },
			    new String[] { "6000", "5", "1111111111111114" },
			    new String[] { "4000", "3", "1111111111111111" },
			    new String[] { "7000", "1", "1111111111111112" },
			    new String[] { "3500", "4", "1111111111111110" },
			    new String[] { "9000", "2", "1111111111111113" },
			    new String[] { "12000", "5","1111111111111114" }
				
				
				
				);
		
		if (donacionTarjeta.count() == 0) {
			for (String[] don: donaciones) {
				Random random = new Random();
				int mes = random.nextInt(6) + 1;
				int dia = random.nextInt(27) + 1;
				int hora = random.nextInt(24) + 1;
				int minuto = random.nextInt(59) + 1;
				DonacionTarjeta donacion = new DonacionTarjeta(LocalDateTime.of(2024, mes, dia, hora, minuto),
						Long.parseLong(don[1]),
						don[2], 
						Double.parseDouble(don[0]));
				
				donacionTarjeta.save(donacion);
				
			}
		}
		
	}

}
