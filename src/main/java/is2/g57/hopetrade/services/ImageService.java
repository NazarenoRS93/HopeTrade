package is2.g57.hopetrade.services;

import java.nio.file.Paths;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// Esto al final no se va a usar. Queda por las dudas.
@Service
public class ImageService {

    // Crear dir si no existe
    private final Path root = Paths.get("imgs");

        public ImageService() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }
    public String save(MultipartFile file) {  
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
            return file.getOriginalFilename();
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }  

    public void delete(String filename) {
        Path file = root.resolve(filename);
        try {
            Files.delete(file);
        } catch (IOException e) {
            throw new RuntimeException("Could not delete the file!");
        }
    }
}
