package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO {
    private Long categoryId;
    private String name;
    private Long createdBy;
    private Long updatedBy;
}