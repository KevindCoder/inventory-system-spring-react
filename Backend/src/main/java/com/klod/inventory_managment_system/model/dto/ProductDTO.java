package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long productId;
    private String name;
    private String brand;
    private int stock;
    private int purchasePrice;
    private int salePrice;
    private String weight;
    private Long providerId;
    private Long categoryId;
}