package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.OrderDetailDTO;
import com.klod.inventory_managment_system.model.entity.OrderDetailEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface OrderDetailMapper {

    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "productPrice", source = "product.salePrice")
    OrderDetailDTO orderDetailToOrderDetailDto(OrderDetailEntity orderDetail);

    OrderDetailEntity orderDetailDtoToOrderDetail(OrderDetailDTO orderDetailDTO);

    List<OrderDetailDTO> orderDetailEntitiesToOrderDetailDTOs(List<OrderDetailEntity> orderDetailEntities);
    List<OrderDetailEntity> orderDetailDTOsToOrderDetailEntities(List<OrderDetailDTO> orderDetailDTOs);
}