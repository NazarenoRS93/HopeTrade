package is2.g57.hopetrade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class HopetradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(HopetradeApplication.class, args);
	}
}
