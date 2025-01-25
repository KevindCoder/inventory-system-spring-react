package com.klod.inventory_managment_system.model.dto.request;

import com.klod.inventory_managment_system.model.enums.Status;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequestDTO {
    @NotNull(message = "Customer ID cannot be null")
    private Long customerId;

    private Status status;

    @NotNull(message = "Order details cannot be null")
    @NotEmpty(message = "Order details cannot be empty")
    private List<@Valid OrderDetailRequestDTO> orderDetails;
}
