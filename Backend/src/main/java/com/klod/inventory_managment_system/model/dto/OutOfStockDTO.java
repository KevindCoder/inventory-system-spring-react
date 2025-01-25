package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OutOfStockDTO {
    private String productName;
    private Integer stock;
}
