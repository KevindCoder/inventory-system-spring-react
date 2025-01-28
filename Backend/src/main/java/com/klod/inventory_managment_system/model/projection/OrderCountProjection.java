package com.klod.inventory_managment_system.model.projection;

import com.klod.inventory_managment_system.model.enums.Status;

public interface OrderCountProjection {
    Status getStatus();

    Long getTotalOrders();
}
