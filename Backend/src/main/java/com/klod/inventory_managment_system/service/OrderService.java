package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.OrderDTO;
import java.util.List;

public interface OrderService {
    OrderDTO getOrderById(Long id);
    void saveOrder(OrderDTO orderDTO);
    List<OrderDTO> getAllOrders();
    void deleteOrderById(Long id);
}