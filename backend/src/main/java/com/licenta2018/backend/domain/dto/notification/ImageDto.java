package com.licenta2018.backend.domain.dto.notification;

import javax.activation.MimeType;

public class ImageDto {
    String imageContent;
    MimeType mimeType;

    public ImageDto(String imageContent, MimeType mimeType){
        this.imageContent = imageContent;
        this.mimeType = mimeType;
    }
}
