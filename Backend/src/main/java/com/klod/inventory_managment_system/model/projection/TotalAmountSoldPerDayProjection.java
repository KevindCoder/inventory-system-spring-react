package com.klod.inventory_managment_system.model.projection;

import com.klod.inventory_managment_system.model.enums.Period;

import java.sql.Date;

public interface TotalAmountSoldPerDayProjection {
    Date getSaleDate();

    Integer getTotalSold();

    Period getPeriod();
}
