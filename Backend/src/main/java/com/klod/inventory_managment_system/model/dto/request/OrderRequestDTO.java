package com.klod.inventory_managment_system.model.dto.request;

import com.klod.inventory_managment_system.model.enums.Status;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequestDTO {
    private Long customerId;
    private Status status;
    private List<OrderDetailRequestDTO> orderDetails;
}
