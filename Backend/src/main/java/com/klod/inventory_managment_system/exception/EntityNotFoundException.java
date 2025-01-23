package com.klod.inventory_managment_system.exception;

import lombok.Getter;

@Getter
public class EntityNotFoundException extends RuntimeException {
    private String message;

    public EntityNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
