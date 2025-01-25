package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.ProductDTO;
import com.klod.inventory_managment_system.model.dto.request.ProductRequestDTO;
import com.klod.inventory_managment_system.model.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface ProductMapper {
    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "providerName", source = "provider.name")
    ProductDTO mapToDTO(ProductEntity entity);

    @Mapping(target = "productId", ignore = true)
    @Mapping(target = "category.categoryId", source = "categoryId")
    @Mapping(target = "provider.providerId", source = "providerId")
    ProductEntity mapToEntity(ProductRequestDTO dto);

    @Mapping(target = "productId", ignore = true)
    @Mapping(target = "category.categoryId", source = "categoryId")
    @Mapping(target = "provider.providerId", source = "providerId")
    void updateEntity(@MappingTarget ProductEntity entity, ProductRequestDTO dto);

    List<ProductDTO> mapToListDTO(List<ProductEntity> entities);
}