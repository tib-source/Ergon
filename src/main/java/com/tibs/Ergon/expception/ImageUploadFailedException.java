package com.tibs.Ergon.expception;

public class ImageUploadFailedException extends RuntimeException {
    public ImageUploadFailedException() {
        super("The provided image could not be uploaded, please try again with a different format.");
    }
}
