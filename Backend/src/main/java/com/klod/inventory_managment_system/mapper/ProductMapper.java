package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.ProductDTO;
import com.klod.inventory_managment_system.model.entity.ProductEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(config = MapperConfig.class)
public interface ProductMapper {
    ProductDTO productToProductDto(ProductEntity product);
    ProductEntity productDtoToProduct(ProductDTO productDTO);
    List<ProductDTO> productEntitiesToProductDTOs(List<ProductEntity> productEntities);
    List<ProductEntity> productDTOsToProductEntities(List<ProductDTO> productDTOs);
}