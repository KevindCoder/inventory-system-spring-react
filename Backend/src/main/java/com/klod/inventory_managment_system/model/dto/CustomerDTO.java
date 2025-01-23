package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDTO {
    private Long customerId;
    private String name;
    private String phoneNumber;
    private String email;
    private String document;
    private String address;
    private String state;
    private String city;
}