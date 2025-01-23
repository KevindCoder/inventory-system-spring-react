package com.klod.inventory_managment_system.exception;

import lombok.Getter;

@Getter
public class EntityAlreadyExistsException extends RuntimeException {
    private String message;

    public EntityAlreadyExistsException(String message) {
        super(message);
        this.message = message;
    }
}
