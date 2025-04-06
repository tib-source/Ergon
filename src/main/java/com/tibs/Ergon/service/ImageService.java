package com.tibs.Ergon.service;

import com.tibs.Ergon.expception.ImageUploadFailedException;
import org.postgresql.shaded.com.ongres.scram.common.bouncycastle.base64.Base64;
import org.postgresql.shaded.com.ongres.scram.common.bouncycastle.base64.DecoderException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

    private final static Logger log = LoggerFactory.getLogger(ImageService.class);

    @Value("${image.upload.directory:${user.home}/.ergon/uploads}")
    private String imageUploadDirectory;



    public String saveImage(String base64Image, String fileName) {
        // Remove the data:image/...;base64, prefix
        byte[] imageByte;
        String base64Data = base64Image.substring(base64Image.indexOf(",") + 1);

        try {
            imageByte = Base64.decode(base64Data);

        } catch (DecoderException e) {
            throw new ImageUploadFailedException();
        }

        String directory = imageUploadDirectory;

        // Ensure the directory exists
        Path path = Paths.get(directory);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                log.error("Failed to create directory: {}", directory, e);
                throw new RuntimeException("Failed to create image directory", e);
            }
        }


        String filePath = directory + "/" + fileName + ".jpg";
        log.info("Saving the image to " + filePath);

        try (FileOutputStream outputStream = new FileOutputStream(filePath)) {
            outputStream.write(imageByte);
        } catch (IOException e) {
            log.error("Failed to save image: {}", filePath, e);
            throw new ImageUploadFailedException();
        }

        return "/images/" + fileName + ".jpg";
    }
}
