package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.OrderDTO;
import com.klod.inventory_managment_system.model.entity.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface OrderMapper {
    OrderDTO orderToOrderDto(OrderEntity order);

    OrderEntity orderDtoToOrder(OrderDTO orderDTO);

    List<OrderDTO> orderEntitiesToOrderDTOs(List<OrderEntity> orderEntities);

    List<OrderEntity> orderDTOsToOrderEntities(List<OrderDTO> orderDTOs);
}