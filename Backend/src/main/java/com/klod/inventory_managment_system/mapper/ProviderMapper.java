package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.ProviderDTO;
import com.klod.inventory_managment_system.model.entity.ProviderEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface ProviderMapper {
    ProviderDTO providerToProviderDto(ProviderEntity provider);
    ProviderEntity providerDtoToProvider(ProviderDTO providerDTO);
    List<ProviderDTO> providerEntitiesToProviderDTOs(List<ProviderEntity> providerEntities);
    List<ProviderEntity> providerDTOsToProviderEntities(List<ProviderDTO> providerDTOs);
}