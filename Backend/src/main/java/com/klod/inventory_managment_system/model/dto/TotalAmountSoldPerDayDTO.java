package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TotalAmountSoldPerDayDTO {
    private LocalDateTime saleDate;
    private Integer totalSold;
}
