package is2.g57.hopetrade.runner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.context.annotation.Configuration;

import org.springframework.boot.ApplicationRunner;

import is2.g57.hopetrade.entity.state.*;
import is2.g57.hopetrade.repository.PublicacionStateRepository;

import java.util.List;

@Configuration
public class StateDataLoader implements ApplicationRunner {

    @Autowired 
    private PublicacionStateRepository stateRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if (stateRepository.count() == 0) {
            List<PublicacionState> states = List.of(
                    new PublicacionStateDisponible(),
                    new PublicacionStateEliminado(),
                    new PublicacionStateFinalizado(),
                    new PublicacionStateReservado(),
                    new PublicacionStateSuspendido()
            );
            stateRepository.saveAll(states);
        }

    }
}