package com.klod.inventory_managment_system.model.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDTO {
    @NotNull(message = "Product name cannot be null")
    @NotEmpty(message = "Product name cannot be empty")
    private String name;

    @NotNull(message = "Product brand cannot be null")
    private String brand;

    @NotNull(message = "Product stock cannot be null")
    @Min(value = 1, message = "Product stock must be greater than 0")
    private Integer stock;

    @NotNull(message = "Product price cannot be null")
    @Min(value = 1, message = "Product price must be greater than 0")
    private Integer price;

    private String weight;

    @NotNull(message = "Category ID cannot be null")
    private Long categoryId;

    @NotNull(message = "Provider ID cannot be null")
    private Long providerId;
}
