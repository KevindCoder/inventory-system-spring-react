package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailDTO {
    private Long orderDetailId;
    private Long productId;
    private String productName;
    private Integer productQuantity;
    private Integer productPrice;
}