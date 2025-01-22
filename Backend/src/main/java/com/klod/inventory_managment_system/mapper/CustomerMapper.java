package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.CustomerDTO;
import com.klod.inventory_managment_system.model.entity.CustomerEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(config = MapperConfig.class)
public interface CustomerMapper {
    CustomerDTO customerToCustomerDto(CustomerEntity customer);
    CustomerEntity customerDtoToCustomer(CustomerDTO customerDTO);
    List<CustomerDTO> customerEntitiesToCustomerDTOs(List<CustomerEntity> customerEntities);
    List<CustomerEntity> customerDTOsToCustomerEntities(List<CustomerDTO> customerDTOs);
}