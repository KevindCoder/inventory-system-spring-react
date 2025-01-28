package com.klod.inventory_managment_system.model.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailRequestDTO {
    @NotNull(message = "Product ID cannot be null")
    private Long productId;

    @NotNull(message = "Product quantity cannot be null")
    @Min(value = 1, message = "Product quantity must be greater than 0")
    private Integer productQuantity;
}
