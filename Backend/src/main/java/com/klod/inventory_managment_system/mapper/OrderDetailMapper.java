package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.OrderDetailDTO;
import com.klod.inventory_managment_system.model.dto.request.OrderDetailRequestDTO;
import com.klod.inventory_managment_system.model.entity.OrderDetailEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface OrderDetailMapper {

    @Mapping(target = "productId", source = "product.productId")
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "productPrice", source = "product.price")
    OrderDetailDTO mapToDTO(OrderDetailEntity entity);

    @Mapping(target = "product.productId", source = "productId")
    OrderDetailEntity mapToEntity(OrderDetailRequestDTO dto);
}