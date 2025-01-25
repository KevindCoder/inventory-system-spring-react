package com.klod.inventory_managment_system.model.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDTO {
    private String name;
    private String brand;
    private Integer stock;
    private Integer price;
    private String weight;
    private Long categoryId;
    private Long providerId;
}
