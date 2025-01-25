package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long productId;
    private String name;
    private String brand;
    private Integer stock;
    private Integer price;
    private String weight;
    private String categoryName;
    private String providerName;
}