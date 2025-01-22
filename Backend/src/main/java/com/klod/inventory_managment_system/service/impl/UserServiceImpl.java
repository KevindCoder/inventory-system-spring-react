package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.mapper.UserMapper;
import com.klod.inventory_managment_system.model.dto.UserDTO;
import com.klod.inventory_managment_system.model.entity.UserEntity;
import com.klod.inventory_managment_system.repository.UserRepository;
import com.klod.inventory_managment_system.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDTO getUserById(Integer id) {
        log.info("Attempting to retrieve user by id: {}", id);
        UserEntity userEntity = userRepository.findById(id).orElseThrow();
        return userMapper.userToUserDto(userEntity);  // Use the correct method
    }

    @Override
    public void saveUser(UserDTO userDTO) {
        log.info("Saving user: {}", userDTO);

        userRepository.findByUsernameOrEmail(userDTO.getUsername(), userDTO.getEmail())
                .ifPresent((user) -> {
                    throw new RuntimeException("User already exists with email or username.");
                });

        UserEntity userEntity = userMapper.userDtoToUser(userDTO);  // Use the correct method
        userRepository.save(userEntity);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        log.info("Retrieving all users");
        List<UserEntity> userEntities = userRepository.findAll();
        return userMapper.userEntitiesToUserDTOs(userEntities);  // Use the correct method
    }

    @Override
    public void deleteUserById(Integer id) {
        log.info("Deleting user by id: {}", id);
        userRepository.deleteById(id);
    }


}
