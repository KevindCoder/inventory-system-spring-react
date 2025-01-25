package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.exception.EntityNotFoundException;
import com.klod.inventory_managment_system.mapper.OrderMapper;
import com.klod.inventory_managment_system.model.dto.OrderDTO;
import com.klod.inventory_managment_system.model.dto.request.OrderRequestDTO;
import com.klod.inventory_managment_system.model.entity.OrderDetailEntity;
import com.klod.inventory_managment_system.model.entity.OrderEntity;
import com.klod.inventory_managment_system.model.enums.Status;
import com.klod.inventory_managment_system.repository.OrderRepository;
import com.klod.inventory_managment_system.service.ManageStockService;
import com.klod.inventory_managment_system.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final ManageStockService manageStockService;

    @Override
    public OrderDTO getOrderById(Long id) {
        log.info("Attempting to retrieve order by id: {}", id);
        OrderEntity orderEntity = getOrderEntityById(id);
        return orderMapper.mapToDTO(orderEntity);
    }

    @Override
    @Transactional
    public OrderDTO saveOrder(OrderRequestDTO orderDTO) {
        log.info("Saving order: {}", orderDTO);

        orderDTO.getOrderDetails().forEach(order ->
                manageStockService.removeStock(order.getProductId(), order.getProductQuantity()));

        OrderEntity orderEntity = orderMapper.mapToEntity(orderDTO);
        for (OrderDetailEntity orderDetailEntity : orderEntity.getOrderDetails()) {
            orderDetailEntity.setOrder(orderEntity);
        }

        orderEntity = orderRepository.save(orderEntity);
        return orderMapper.mapToDTO(orderEntity);
    }

    @Override
    public OrderDTO updateOrderStatus(Long id, Status status) {
        log.info("Updating order with id: {} status to `{}`", id, status);
        OrderEntity orderEntity = getOrderEntityById(id);
        orderEntity.setStatus(status);
        orderEntity = orderRepository.save(orderEntity);
        return orderMapper.mapToDTO(orderEntity);
    }


    @Override
    public List<OrderDTO> getAllOrders() {
        log.info("Retrieving all orders");
        List<OrderEntity> orderEntities = orderRepository.findAll();
        return orderMapper.mapToListDTO(orderEntities);
    }

    @Override
    public void deleteOrderById(Long id) {
        log.info("Deleting order by id: {}", id);
        OrderEntity orderEntity = getOrderEntityById(id);
        orderRepository.delete(orderEntity);
    }

    private OrderEntity getOrderEntityById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
    }
}