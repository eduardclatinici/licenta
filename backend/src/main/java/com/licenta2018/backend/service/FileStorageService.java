package com.licenta2018.backend.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.licenta2018.backend.domain.dto.FileStorageProperties;

@Service
public class FileStorageService {

    @Autowired
    private FileStorageProperties fileStorageProperties;

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    String storeFile(long id, MultipartFile file) {
        String fileName = file.getOriginalFilename();
        Path directoryPath = Paths.get(fileStorageProperties.getUploadDir() + "/" + id).toAbsolutePath().normalize();

        createDirectory(directoryPath);

        Path targetLocation = directoryPath.resolve("name"+'.'+fileName.split("\\.")[1]);
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

    public String getFile(int id, String fileName) throws IOException {
        Path path = Paths.get(this.fileStorageProperties.getUploadDir()+'/'+id+'/'+fileName);
        byte[] bytes = Files.readAllBytes(path);
        return Base64.encodeBase64String(bytes);
    }
}
