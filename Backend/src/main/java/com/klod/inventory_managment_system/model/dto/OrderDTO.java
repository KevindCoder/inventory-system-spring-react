package com.klod.inventory_managment_system.model.dto;

import com.klod.inventory_managment_system.model.enums.Status;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private Long orderId;
    private CustomerDTO customer;
    private List<OrderDetailDTO> orderDetails;
    private Status status;
    private int totalValue;
}