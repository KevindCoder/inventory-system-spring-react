package com.klod.inventory_managment_system.exception;

import com.klod.inventory_managment_system.model.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(exception = EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(EntityNotFoundException exception) {
        String errorMessage = exception.getMessage();
        HttpStatus status = HttpStatus.NOT_FOUND;

        return handleErrorResponse(errorMessage, status);
    }

    @ExceptionHandler(exception = EntityAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEntityAlreadyExistsException(EntityAlreadyExistsException exception) {
        String errorMessage = exception.getMessage();
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return handleErrorResponse(errorMessage, status);
    }

    private ResponseEntity<ErrorResponse> handleErrorResponse(String errorMessage, HttpStatus status) {
        log.warn(errorMessage);
        ErrorResponse errorResponse = new ErrorResponse(errorMessage, status.value());
        return ResponseEntity.status(status).body(errorResponse);
    }
}
