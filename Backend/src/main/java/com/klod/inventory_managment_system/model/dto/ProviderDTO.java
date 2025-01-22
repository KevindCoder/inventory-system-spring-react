package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProviderDTO {
    private Long providerId;
    private String name;
    private String phoneNumber;
    private String email;
    private Long createdBy;
    private Long updatedBy;
}