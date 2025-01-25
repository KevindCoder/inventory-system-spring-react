package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.ProviderDTO;
import com.klod.inventory_managment_system.model.entity.ProviderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface ProviderMapper {
    ProviderDTO mapToDTO(ProviderEntity entity);

    @Mapping(target = "providerId", ignore = true)
    ProviderEntity mapToEntity(ProviderDTO dto);

    @Mapping(target = "providerId", ignore = true)
    void updateEntity(@MappingTarget ProviderEntity entity, ProviderDTO dto);

    List<ProviderDTO> mapToListDTO(List<ProviderEntity> entities);
}