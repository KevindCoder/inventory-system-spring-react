package com.klod.inventory_managment_system.model.dto;

import com.klod.inventory_managment_system.model.enums.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusStatsDTO {
    private Status status;
    private Integer totalOrders;
}
