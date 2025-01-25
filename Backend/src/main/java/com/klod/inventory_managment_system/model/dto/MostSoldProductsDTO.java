package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MostSoldProductsDTO {
    private String productName;
    private Integer productPrice;
    private Integer totalQuantitySold;
    private Integer totalSoldAmount;
}
