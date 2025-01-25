package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.OrderDTO;
import com.klod.inventory_managment_system.model.dto.request.OrderRequestDTO;
import com.klod.inventory_managment_system.model.entity.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(config = MapperConfig.class, uses = {CustomerMapper.class, OrderDetailMapper.class})
public interface OrderMapper {

    @Mapping(target = "totalValue", source = ".", qualifiedByName = "calculateTotalValue")
    OrderDTO mapToDTO(OrderEntity order);

    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "customer.customerId", source = "customerId")
    @Mapping(target = "status", constant = "INVOICED")
    OrderEntity mapToEntity(OrderRequestDTO orderDTO);

    List<OrderDTO> mapToListDTO(List<OrderEntity> orderEntities);

    @Named("calculateTotalValue")
    default Integer calculateTotalValue(OrderEntity order) {
        return order.getOrderDetails().stream()
                .mapToInt(orderDetail -> orderDetail.getProduct().getPrice() * orderDetail.getProductQuantity())
                .sum();
    }
}