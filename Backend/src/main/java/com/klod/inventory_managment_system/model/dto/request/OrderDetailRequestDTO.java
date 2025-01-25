package com.klod.inventory_managment_system.model.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailRequestDTO {
    private Long productId;
    private Integer productQuantity;
}
