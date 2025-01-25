package com.klod.inventory_managment_system.model.projection;

import java.time.LocalDate;

public interface Report2Projection {
    String getProductName();

    Integer getTotalQuantitySold();

    String getDayOfTheWeek();

    LocalDate getSaleDate();
}
