package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailDTO {
    private Long orderDetailId;
    private String productName;
    private int productQuantity;
    private int productPrice;
    private int price;
}