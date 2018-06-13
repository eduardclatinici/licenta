package com.licenta2018.backend.exceptions;

public class AppUserNotFoundException extends RuntimeException {
    public AppUserNotFoundException(String message) { super(message); }
}
