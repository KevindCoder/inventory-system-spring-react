package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.OrderDTO;
import com.klod.inventory_managment_system.model.dto.request.OrderRequestDTO;
import com.klod.inventory_managment_system.model.enums.Status;

import java.util.List;

public interface OrderService {
    OrderDTO getOrderById(Long id);

    OrderDTO saveOrder(OrderRequestDTO orderDTO);

    OrderDTO updateOrderStatus(Long id, Status status);

    List<OrderDTO> getAllOrders();

    void deleteOrderById(Long id);
}