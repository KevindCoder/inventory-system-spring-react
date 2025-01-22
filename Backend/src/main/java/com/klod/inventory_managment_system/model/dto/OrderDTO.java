package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private Long orderId;
    private int totalValue;
    private String providerName;
    private String customerName;
    private List<OrderDetailDTO> orderDetails;
}