package com.klod.inventory_managment_system.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProviderDTO {
    private Long providerId;
    @NotNull(message = "Name cannot be null")
    @NotEmpty(message = "Name cannot be empty")
    private String name;
    private String phoneNumber;

    @NotNull(message = "Email cannot be null")
    @NotEmpty(message = "Email cannot be empty")
    private String email;
}