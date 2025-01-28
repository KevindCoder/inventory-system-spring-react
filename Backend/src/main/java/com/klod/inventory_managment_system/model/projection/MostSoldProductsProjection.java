package com.klod.inventory_managment_system.model.projection;

public interface MostSoldProductsProjection {
    String getProductName();

    Integer getProductPrice();

    Integer getTotalQuantitySold();

    Integer getTotalSoldAmount();
}
