package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.CategoryDTO;
import com.klod.inventory_managment_system.model.entity.CategoryEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(config = MapperConfig.class)
public interface CategoryMapper {
    CategoryDTO categoryToCategoryDto(CategoryEntity category);
    CategoryEntity categoryDtoToCategory(CategoryDTO categoryDTO);
    List<CategoryDTO> categoryEntitiesToCategoryDTOs(List<CategoryEntity> categoryEntities);
    List<CategoryEntity> categoryDTOsToCategoryEntities(List<CategoryDTO> categoryDTOs);
}