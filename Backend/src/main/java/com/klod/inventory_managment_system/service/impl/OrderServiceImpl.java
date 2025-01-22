package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.mapper.OrderMapper;
import com.klod.inventory_managment_system.model.dto.OrderDTO;
import com.klod.inventory_managment_system.model.entity.OrderEntity;
import com.klod.inventory_managment_system.repository.OrderRepository;
import com.klod.inventory_managment_system.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    public OrderDTO getOrderById(Long id) {
        log.info("Attempting to retrieve order by id: {}", id);
        OrderEntity orderEntity = orderRepository.findById(id).orElseThrow();
        return orderMapper.orderToOrderDto(orderEntity);
    }

    @Override
    public void saveOrder(OrderDTO orderDTO) {
        log.info("Saving order: {}", orderDTO);
        OrderEntity orderEntity = orderMapper.orderDtoToOrder(orderDTO);
        orderRepository.save(orderEntity);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        log.info("Retrieving all orders");
        List<OrderEntity> orderEntities = orderRepository.findAll();
        return orderMapper.orderEntitiesToOrderDTOs(orderEntities);
    }

    @Override
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }
}