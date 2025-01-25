package com.klod.inventory_managment_system.model.projection;

import com.klod.inventory_managment_system.model.enums.Period;

import java.time.LocalDate;

public interface Report1Projection {
    LocalDate getSaleDate();

    Integer totalSold();

    Period getPeriod();
}
