package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.CategoryDTO;
import com.klod.inventory_managment_system.model.entity.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface CategoryMapper {
    CategoryDTO mapToDTO(CategoryEntity entity);

    @Mapping(target = "categoryId", ignore = true)
    CategoryEntity mapToEntity(CategoryDTO dto);

    @Mapping(target = "categoryId", ignore = true)
    void updateEntity(@MappingTarget CategoryEntity entity, CategoryDTO dto);

    List<CategoryDTO> mapToListDTO(List<CategoryEntity> entities);
}