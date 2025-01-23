package com.klod.inventory_managment_system.mapper;


import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.UserDTO;
import com.klod.inventory_managment_system.model.dto.UserRequestDTO;
import com.klod.inventory_managment_system.model.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface UserMapper {

    UserDTO mapToDTO(UserEntity entity);

    UserEntity mapToEntity(UserRequestDTO requestDTO);

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "username", ignore = true)
    void updateEntity(@MappingTarget UserEntity entity, UserRequestDTO dto);

    List<UserDTO> mapToListDTO(List<UserEntity> entities);
}

