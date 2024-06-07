package is2.g57.hopetrade.services;

import java.nio.file.Paths;
import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.UUID;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    // Crear dir si no existe
    private final Path root = Paths.get("imgs");
    private final Path sample = Paths.get("sample");

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

    public String saveUnique(MultipartFile file) {  
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = getFileExtension(originalFilename);
            String uniqueFilename = generateUniqueFilename(extension);

            Files.copy(file.getInputStream(), this.root.resolve(uniqueFilename));
            return uniqueFilename;
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public String saveUnique(String base64String) {  
    try {
        // Decode Base64 string to byte array
        byte[] decodedBytes = Base64.getDecoder().decode(base64String);

        // Get file extension
        String extension = getFileExtension(base64String);

        // Generate unique filename
        String uniqueFilename = generateUniqueFilename(extension);

        // Write byte array to file
        Path filePath = this.root.resolve(uniqueFilename);
        OutputStream outputStream = new FileOutputStream(filePath.toFile());
        outputStream.write(decodedBytes);
        outputStream.close();

        return uniqueFilename;
    } catch (Exception e) {
        throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
    }
}

    public String saveUnique(Resource resource) {
        try {
            String originalFilename = resource.getFilename();
            String extension = getFileExtension(originalFilename);
            String uniqueFilename = generateUniqueFilename(extension);
            Files.copy(resource.getInputStream(), this.root.resolve(uniqueFilename));
            return uniqueFilename;
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

public Resource load(String filename) {
    try {
        Path file = root.resolve(filename);
        System.out.println("Resolved File Path: " + file.toString()); // Log the resolved file path
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable()) {
            System.out.println(filename + " exists and is readable");
            return resource;
        } else {
            throw new RuntimeException("Could not read the file!");
        }
    } catch (MalformedURLException e) {
        throw new RuntimeException("Error: " + e.getMessage());
    }
}

public Resource loadSample(String filename) {
    try {
        Path file = sample.resolve(filename);
        System.out.println("Resolved File Path: " + file.toString()); // Log the resolved file path
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable()) {
            System.out.println(filename + " exists and is readable");
            return resource;
        } else {
            throw new RuntimeException("Could not read the file!");
        }
    } catch (MalformedURLException e) {
        throw new RuntimeException("Error: " + e.getMessage());
    }
}

public String loadSampleBase64(String filename) {
    try {
        Path file = sample.resolve(filename);
        System.out.println("Resolved File Path: " + file.toString()); // Log the resolved file path
        return Base64.getEncoder().encodeToString(Files.readAllBytes(file));
    } catch (IOException e) {
        throw new RuntimeException("Error: " + e.getMessage());
    }
}

public String loadBase64(String filename) {
    try {
        Path file = root.resolve(filename);
        System.out.println("Resolved File Path: " + file.toString()); // Log the resolved file path
        return Base64.getEncoder().encodeToString(Files.readAllBytes(file));
    } catch (IOException e) {
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

    private String getFileExtension(String filename) {
        int lastIndex = filename.lastIndexOf(".");
        if (lastIndex == -1) {
            return ""; // No extension found
        }
        return filename.substring(lastIndex);
    }

    private String generateUniqueFilename(String extension) {
        String uniqueFilename = UUID.randomUUID().toString();
        if (!extension.isEmpty()) {
            uniqueFilename += extension;
        }
        return uniqueFilename;
    }

    public Resource convertMultipartFileToResource(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            return new ByteArrayResource(bytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
