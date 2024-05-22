// WebConfig.java alternativo para no tener conflicto con el que suban al master. Eliminar cuando se suba el del master, aunque probablemente no tengan mucha diferencia

package is2.g57.hopetrade.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class tempWebConfig implements WebMvcConfigurer {
    @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*") // deberia permitir llamados de cualquier puerto
                        .allowedMethods(HttpMethod.GET.name(),
                                        HttpMethod.POST.name(),
                                        HttpMethod.PUT.name(),
                                        HttpMethod.DELETE.name())
                        .allowedHeaders(HttpHeaders.CONTENT_TYPE,
                                        HttpHeaders.AUTHORIZATION);
            }
}
