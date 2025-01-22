package com.klod.inventory_managment_system.mapper;


import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.dto.UserDTO;
import com.klod.inventory_managment_system.model.entity.UserEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface UserMapper {


    UserDTO userToUserDto(UserEntity user);


    UserEntity userDtoToUser(UserDTO userDTO);

    List<UserDTO> userEntitiesToUserDTOs(List<UserEntity> userEntities);

    List<UserEntity> userDTOsToUserEntities(List<UserDTO> userDTOs);
}

