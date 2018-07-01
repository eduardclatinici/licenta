package com.licenta2018.backend.service;

import com.licenta2018.backend.domain.dto.FileStorageProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    @Autowired
    private FileStorageProperties fileStorageProperties;

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    String storeFile(long id, MultipartFile file) {
        String fileName = file.getOriginalFilename();
        Path directoryPath = Paths.get(fileStorageProperties.getUploadDir() + "/" + id).toAbsolutePath().normalize();

        createDirectory(directoryPath);

        Path targetLocation = directoryPath.resolve(fileName);
        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            return null;
        }
        return targetLocation.toAbsolutePath().toString();
    }

    private void createDirectory(Path fileStorageLocation) {
        try {
            Files.createDirectories(fileStorageLocation);
        } catch (IOException e) {
            log.warn("Directory already exists - {}", fileStorageLocation.toAbsolutePath().toString());
        }
    }
}
