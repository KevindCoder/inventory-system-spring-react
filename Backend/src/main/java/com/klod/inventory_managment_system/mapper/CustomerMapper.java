package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.CustomerDTO;
import com.klod.inventory_managment_system.model.entity.CustomerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface CustomerMapper {
    CustomerDTO mapToDTO(CustomerEntity entity);

    @Mapping(target = "customerId", ignore = true)
    CustomerEntity mapToEntity(CustomerDTO dto);

    @Mapping(target = "customerId", ignore = true)
    void updateEntity(@MappingTarget CustomerEntity entity, CustomerDTO dto);

    List<CustomerDTO> mapToListDTO(List<CustomerEntity> customerEntities);
}