package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.OutOfStockDTO;

import java.util.List;

public interface NotificationService {

    List<OutOfStockDTO> getOutOfStockProducts();
}
